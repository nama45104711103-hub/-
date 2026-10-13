export type Rgb = { r: number; g: number; b: number };
export type Lab = { l: number; a: number; b: number };

const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

/** 入力を `#rrggbb` 形式に正規化する。解釈できない場合は null。 */
export function normalizeHex(input: string): string | null {
  const trimmed = input.trim();
  const matched = HEX_PATTERN.exec(trimmed);
  if (!matched) return null;

  const body = matched[1].toLowerCase();
  if (body.length === 3) {
    return `#${body[0]}${body[0]}${body[1]}${body[1]}${body[2]}${body[2]}`;
  }
  return `#${body}`;
}

export function hexToRgb(hex: string): Rgb | null {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  return {
    r: Number.parseInt(normalized.slice(1, 3), 16),
    g: Number.parseInt(normalized.slice(3, 5), 16),
    b: Number.parseInt(normalized.slice(5, 7), 16),
  };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const part = (value: number) =>
    Math.max(0, Math.min(255, Math.round(value)))
      .toString(16)
      .padStart(2, "0");
  return `#${part(r)}${part(g)}${part(b)}`;
}

/** sRGB(0-255) を CIELAB に変換する（D65 / 2度視野）。 */
export function rgbToLab({ r, g, b }: Rgb): Lab {
  const linear = (value: number) => {
    const v = Math.max(0, Math.min(255, value)) / 255;
    return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };

  const lr = linear(r);
  const lg = linear(g);
  const lb = linear(b);

  const x = (lr * 0.4124564 + lg * 0.3575761 + lb * 0.1804375) / 0.95047;
  const y = lr * 0.2126729 + lg * 0.7151522 + lb * 0.072175;
  const z = (lr * 0.0193339 + lg * 0.119192 + lb * 0.9503041) / 1.08883;

  const f = (t: number) => (t > 216 / 24389 ? Math.cbrt(t) : (841 / 108) * t + 4 / 29);
  const fx = f(x);
  const fy = f(y);
  const fz = f(z);

  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  };
}

export function hexToLab(hex: string): Lab | null {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToLab(rgb) : null;
}

/** CIELAB 上のユークリッド距離（CIE76 の色差）。0 に近いほど同じ色。 */
export function deltaE(a: Lab, b: Lab): number {
  return Math.hypot(a.l - b.l, a.a - b.a, a.b - b.b);
}

/**
 * 色差を 0-100 の近さスコアに直す。
 * 色差 0 で 100、色差 60 以上で 0 になるようゆるやかに減らす。
 */
export function similarityScore(distance: number): number {
  if (!Number.isFinite(distance)) return 0;
  const clamped = Math.max(0, Math.min(60, distance));
  const score = 100 * (1 - clamped / 60) ** 1.4;
  return Math.round(Math.max(0, Math.min(100, score)));
}

/** 背景色の明るさから、上に乗せる文字色を白か黒で選ぶ。 */
export function readableTextColor(hex: string): "#ffffff" | "#111111" {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#111111";
  const channel = (value: number) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const luminance =
    0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
  return luminance > 0.45 ? "#111111" : "#ffffff";
}
