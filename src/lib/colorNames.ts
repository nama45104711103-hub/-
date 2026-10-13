import { normalizeHex } from "./color";

/** 日本語・英語の色名から代表的な色コードを引くための辞書。 */
const COLOR_NAMES: Record<string, string> = {
  // 基本色
  赤: "#e60033",
  あか: "#e60033",
  red: "#e60033",
  青: "#0068b7",
  あお: "#0068b7",
  blue: "#0068b7",
  黄: "#ffd900",
  黄色: "#ffd900",
  きいろ: "#ffd900",
  yellow: "#ffd900",
  緑: "#00a960",
  みどり: "#00a960",
  green: "#00a960",
  白: "#fdfdfd",
  しろ: "#fdfdfd",
  white: "#fdfdfd",
  黒: "#1a1a1a",
  くろ: "#1a1a1a",
  black: "#1a1a1a",
  灰: "#949495",
  灰色: "#949495",
  グレー: "#949495",
  gray: "#949495",
  grey: "#949495",
  茶: "#965042",
  茶色: "#965042",
  ちゃいろ: "#965042",
  brown: "#965042",
  橙: "#f6a01a",
  オレンジ: "#f6a01a",
  orange: "#f6a01a",
  紫: "#884898",
  むらさき: "#884898",
  purple: "#884898",
  ピンク: "#f6adc6",
  桃色: "#f6adc6",
  pink: "#f6adc6",

  // 青系
  水色: "#7fcce3",
  みずいろ: "#7fcce3",
  空色: "#a0d8ef",
  そらいろ: "#a0d8ef",
  skyblue: "#a0d8ef",
  lightblue: "#a0d8ef",
  藍色: "#165e83",
  あいいろ: "#165e83",
  indigo: "#165e83",
  群青: "#4c6cb3",
  紺: "#223a70",
  紺色: "#223a70",
  navy: "#223a70",
  瑠璃色: "#1e50a2",
  浅葱色: "#00a3af",
  シアン: "#00a7db",
  cyan: "#00a7db",
  aqua: "#00a7db",
  ターコイズ: "#00a497",
  turquoise: "#00a497",
  青緑: "#00a497",
  teal: "#00808d",

  // 緑系
  黄緑: "#b0ca71",
  きみどり: "#b0ca71",
  ライム: "#b0ca71",
  lime: "#b0ca71",
  若草色: "#c3d825",
  深緑: "#00552e",
  抹茶色: "#c5c56a",
  オリーブ: "#7f7b36",
  olive: "#7f7b36",
  カーキ: "#c7b370",
  khaki: "#c7b370",
  エメラルド: "#00a381",
  エメラルドグリーン: "#00a381",
  emerald: "#00a381",
  翡翠色: "#38b48b",
  鶯色: "#928c36",

  // 赤・ピンク系
  朱色: "#eb6101",
  紅: "#e95464",
  べに: "#e95464",
  えんじ: "#b7282e",
  ワインレッド: "#a22041",
  赤紫: "#e95295",
  コーラル: "#ee836f",
  coral: "#ee836f",
  珊瑚色: "#ee836f",
  桜色: "#fef4f4",
  さくらいろ: "#fef4f4",
  マゼンタ: "#e4007f",
  magenta: "#e4007f",

  // 紫系
  菫色: "#7058a3",
  バイオレット: "#7058a3",
  violet: "#7058a3",
  藤色: "#8b81c3",
  ふじいろ: "#8b81c3",
  ラベンダー: "#c0a2c7",
  lavender: "#c0a2c7",

  // 黄・茶系
  山吹色: "#f8b500",
  からし色: "#d0af4c",
  mustard: "#d0af4c",
  クリーム: "#f8f4e6",
  cream: "#f8f4e6",
  ベージュ: "#e8d3c7",
  beige: "#e8d3c7",
  金: "#e6b422",
  金色: "#e6b422",
  ゴールド: "#e6b422",
  gold: "#e6b422",
  銀: "#c0c0c0",
  銀色: "#c0c0c0",
  シルバー: "#c0c0c0",
  silver: "#c0c0c0",

  // クラゲらしい色
  透明: "#eaf4fb",
  とうめい: "#eaf4fb",
  クリア: "#eaf4fb",
  clear: "#eaf4fb",
  乳白色: "#f3f0e9",
};

/** 入力欄の下に並べる、押すだけで試せる色。 */
export const PRESET_COLORS: { label: string; hex: string }[] = [
  { label: "透明", hex: "#eaf4fb" },
  { label: "水色", hex: "#7fcce3" },
  { label: "青", hex: "#0068b7" },
  { label: "紫", hex: "#884898" },
  { label: "ピンク", hex: "#f6adc6" },
  { label: "赤", hex: "#e60033" },
  { label: "オレンジ", hex: "#f6a01a" },
  { label: "黄色", hex: "#ffd900" },
  { label: "緑", hex: "#00a960" },
  { label: "茶色", hex: "#965042" },
  { label: "黒", hex: "#1a1a1a" },
];

export type ResolvedColor = {
  hex: string;
  /** 入力をそのまま表示に使うためのラベル。 */
  label: string;
  matchedBy: "hex" | "name";
};

function canonical(input: string): string {
  return input.trim().toLowerCase().replace(/[\s　]/g, "");
}

/** 色コード（#ff00aa / f0a など）か色名の文字列を色に解決する。 */
export function resolveColor(input: string): ResolvedColor | null {
  if (!input) return null;

  const hex = normalizeHex(input);
  if (hex) return { hex, label: hex, matchedBy: "hex" };

  const key = canonical(input);
  if (!key) return null;

  const fromName =
    COLOR_NAMES[key] ??
    COLOR_NAMES[key.replace(/色$/, "")] ??
    COLOR_NAMES[`${key}色`] ??
    COLOR_NAMES[key.replace(/っぽい$|みたいな色$|のような色$|系$/, "")];

  if (!fromName) return null;
  return { hex: fromName, label: input.trim(), matchedBy: "name" };
}

/** 対応している色名の数。ヒント表示に使う。 */
export const COLOR_NAME_COUNT = Object.keys(COLOR_NAMES).length;
