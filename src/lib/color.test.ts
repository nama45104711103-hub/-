import { describe, expect, it } from "vitest";

import {
  deltaE,
  hexToLab,
  hexToRgb,
  normalizeHex,
  readableTextColor,
  rgbToHex,
  rgbToLab,
  similarityScore,
} from "./color";

describe("normalizeHex", () => {
  it("#付き6桁をそのまま小文字で返す", () => {
    expect(normalizeHex("#A1B2C3")).toBe("#a1b2c3");
  });

  it("#なしでも受け付ける", () => {
    expect(normalizeHex("ff0000")).toBe("#ff0000");
  });

  it("3桁を6桁に展開する", () => {
    expect(normalizeHex("#f0a")).toBe("#ff00aa");
  });

  it("前後の空白を無視する", () => {
    expect(normalizeHex("  #abcdef  ")).toBe("#abcdef");
  });

  it("色として読めない入力は null", () => {
    for (const input of ["", "   ", "#12", "#12345", "#1234567", "赤", "#gggggg", "rgb(1,2,3)"]) {
      expect(normalizeHex(input)).toBeNull();
    }
  });
});

describe("hexToRgb / rgbToHex", () => {
  it("往復しても値が変わらない", () => {
    expect(rgbToHex(hexToRgb("#3b6fb6")!)).toBe("#3b6fb6");
  });

  it("各チャンネルを正しく取り出す", () => {
    expect(hexToRgb("#102030")).toEqual({ r: 16, g: 32, b: 48 });
  });

  it("範囲外の値は 00〜ff に収める", () => {
    expect(rgbToHex({ r: -20, g: 300, b: 127.6 })).toBe("#00ff80");
  });

  it("不正な入力は null", () => {
    expect(hexToRgb("みずいろ")).toBeNull();
  });
});

describe("rgbToLab", () => {
  it("白は L=100、a と b はほぼ 0", () => {
    const lab = rgbToLab({ r: 255, g: 255, b: 255 });
    expect(lab.l).toBeCloseTo(100, 2);
    expect(lab.a).toBeCloseTo(0, 2);
    expect(lab.b).toBeCloseTo(0, 2);
  });

  it("黒は L=0", () => {
    expect(rgbToLab({ r: 0, g: 0, b: 0 }).l).toBeCloseTo(0, 5);
  });

  it("赤はよく知られた値になる", () => {
    const lab = rgbToLab({ r: 255, g: 0, b: 0 });
    expect(lab.l).toBeCloseTo(53.24, 1);
    expect(lab.a).toBeCloseTo(80.09, 1);
    expect(lab.b).toBeCloseTo(67.2, 1);
  });

  it("青は b がマイナスになる", () => {
    expect(rgbToLab({ r: 0, g: 0, b: 255 }).b).toBeLessThan(-50);
  });
});

describe("deltaE", () => {
  it("同じ色なら 0", () => {
    const lab = hexToLab("#7fcce3")!;
    expect(deltaE(lab, lab)).toBe(0);
  });

  it("似た色より違う色のほうが大きい", () => {
    const base = hexToLab("#0068b7")!;
    const near = hexToLab("#0a70bd")!;
    const far = hexToLab("#ffd900")!;
    expect(deltaE(base, near)).toBeLessThan(deltaE(base, far));
  });

  it("白と黒の色差は 100 になる", () => {
    expect(deltaE(hexToLab("#ffffff")!, hexToLab("#000000")!)).toBeCloseTo(100, 1);
  });
});

describe("similarityScore", () => {
  it("色差 0 は 100 点", () => {
    expect(similarityScore(0)).toBe(100);
  });

  it("色差が大きいほど点が下がる", () => {
    expect(similarityScore(5)).toBeGreaterThan(similarityScore(20));
    expect(similarityScore(20)).toBeGreaterThan(similarityScore(40));
  });

  it("色差 60 以上は 0 点で止まる", () => {
    expect(similarityScore(60)).toBe(0);
    expect(similarityScore(500)).toBe(0);
  });

  it("0〜100 の整数に収まる", () => {
    for (const d of [0, 1, 7.5, 33, 59.9, 120, Number.NaN]) {
      const score = similarityScore(d);
      expect(Number.isInteger(score)).toBe(true);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    }
  });
});

describe("readableTextColor", () => {
  it("明るい色の上では黒文字", () => {
    expect(readableTextColor("#ffd900")).toBe("#111111");
  });

  it("暗い色の上では白文字", () => {
    expect(readableTextColor("#223a70")).toBe("#ffffff");
  });

  it("不正な入力でも落ちない", () => {
    expect(readableTextColor("??")).toBe("#111111");
  });
});
