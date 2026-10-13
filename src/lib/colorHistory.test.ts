import { describe, expect, it } from "vitest";

import { HISTORY_MAX, parseHistory, withColor } from "./colorHistory";

describe("parseHistory", () => {
  it("色コードの配列をそのまま読む", () => {
    expect(parseHistory('["#7fcce3","#e60033"]')).toEqual(["#7fcce3", "#e60033"]);
  });

  it("表記を正規化し、重複を取り除く", () => {
    expect(parseHistory('["#F0A","#ff00aa","FF00AA"]')).toEqual(["#ff00aa"]);
  });

  it("色として読めない要素は捨てる", () => {
    expect(parseHistory('["#7fcce3", 42, null, "みずいろ"]')).toEqual(["#7fcce3"]);
  });

  it("保存件数の上限を超えない", () => {
    const many = JSON.stringify(
      Array.from({ length: 30 }, (_, i) => `#${i.toString(16).padStart(6, "0")}`),
    );
    expect(parseHistory(many)).toHaveLength(HISTORY_MAX);
  });

  it("null・空文字・壊れたJSON・配列以外は空配列", () => {
    for (const raw of [null, "", "{", '{"a":1}', '"#fff"', "123"]) {
      expect(parseHistory(raw)).toEqual([]);
    }
  });
});

describe("withColor", () => {
  it("新しい色を先頭に足す", () => {
    expect(withColor(["#e60033"], "#7fcce3")).toEqual(["#7fcce3", "#e60033"]);
  });

  it("同じ色は重複させず先頭へ移す", () => {
    expect(withColor(["#e60033", "#7fcce3"], "#7fcce3")).toEqual([
      "#7fcce3",
      "#e60033",
    ]);
  });

  it("表記が違っても同じ色として扱う", () => {
    expect(withColor(["#ff00aa"], "#F0A")).toEqual(["#ff00aa"]);
  });

  it("上限を超えたら古いものから消える", () => {
    const full = Array.from(
      { length: HISTORY_MAX },
      (_, i) => `#${i.toString(16).padStart(6, "0")}`,
    );
    const next = withColor(full, "#123456");
    expect(next).toHaveLength(HISTORY_MAX);
    expect(next[0]).toBe("#123456");
    expect(next).not.toContain(full[HISTORY_MAX - 1]);
  });

  it("色として読めない入力では履歴を変えない", () => {
    const history = ["#7fcce3"];
    expect(withColor(history, "クラゲ")).toBe(history);
  });
});
