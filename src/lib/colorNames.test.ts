import { describe, expect, it } from "vitest";

import { PRESET_COLORS, resolveColor } from "./colorNames";
import { normalizeHex } from "./color";

describe("resolveColor", () => {
  it("色コードはそのまま使う", () => {
    expect(resolveColor("#F0A")).toEqual({
      hex: "#ff00aa",
      label: "#ff00aa",
      matchedBy: "hex",
    });
  });

  it("日本語の色名を色コードに変換する", () => {
    expect(resolveColor("みずいろ")?.hex).toBe("#7fcce3");
    expect(resolveColor("紫")?.matchedBy).toBe("name");
  });

  it("英語の色名も大文字小文字を問わず受け付ける", () => {
    expect(resolveColor("Pink")?.hex).toBe(resolveColor("pink")?.hex);
    expect(resolveColor("GREEN")?.hex).toBe("#00a960");
  });

  it("「色」が付いてもなくても同じ結果になる", () => {
    expect(resolveColor("赤")?.hex).toBe(resolveColor("赤色")?.hex);
    expect(resolveColor("黄色")?.hex).toBe(resolveColor("黄")?.hex);
  });

  it("前後の空白を無視する", () => {
    expect(resolveColor("  青  ")?.hex).toBe("#0068b7");
  });

  it("入力をラベルとして残す", () => {
    expect(resolveColor(" ピンク ")?.label).toBe("ピンク");
  });

  it("知らない言葉や空文字は null", () => {
    for (const input of ["", "   ", "クラゲ", "#12345", "xyz"]) {
      expect(resolveColor(input)).toBeNull();
    }
  });
});

describe("PRESET_COLORS", () => {
  it("すべて有効な色コード", () => {
    for (const preset of PRESET_COLORS) {
      expect(normalizeHex(preset.hex)).toBe(preset.hex);
      expect(preset.label.length).toBeGreaterThan(0);
    }
  });
});
