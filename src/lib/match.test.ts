import { describe, expect, it } from "vitest";

import { JELLYFISH } from "./jellyfish";
import { findMatches, matchComment, rankJellyfish } from "./match";

describe("JELLYFISH データ", () => {
  it("すべて正しい色コードを持つ", () => {
    for (const jellyfish of JELLYFISH) {
      expect(jellyfish.hex).toMatch(/^#[0-9a-f]{6}$/);
      expect(jellyfish.accent).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("id が重複していない", () => {
    const ids = JELLYFISH.map((jellyfish) => jellyfish.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("rankJellyfish", () => {
  it("全種を近い順に返す", () => {
    const ranked = rankJellyfish("#3b6fb6");
    expect(ranked).toHaveLength(JELLYFISH.length);
    for (let i = 1; i < ranked.length; i += 1) {
      expect(ranked[i].distance).toBeGreaterThanOrEqual(ranked[i - 1].distance);
    }
  });

  it("データと同じ色を入れるとその種が1位で100点", () => {
    const target = JELLYFISH.find((jellyfish) => jellyfish.id === "aequorea-victoria")!;
    const [top] = rankJellyfish(target.hex);
    expect(top.jellyfish.id).toBe(target.id);
    expect(top.distance).toBe(0);
    expect(top.score).toBe(100);
  });

  it("青を入れると青いクラゲが上位に来る", () => {
    const topIds = rankJellyfish("#0068b7")
      .slice(0, 3)
      .map((match) => match.jellyfish.id);
    expect(topIds).toContain("catostylus-mosaicus");
  });

  it("黄色を入れると黄色いクラゲが1位になる", () => {
    const [top] = rankJellyfish("#ffd900");
    expect(["mastigias-etpisoni", "phacellophora-camtschatica"]).toContain(top.jellyfish.id);
  });

  it("色として読めない入力では空配列", () => {
    expect(rankJellyfish("")).toEqual([]);
    expect(rankJellyfish("すきないろ")).toEqual([]);
  });
});

describe("findMatches", () => {
  it("件数を指定した分だけ返す", () => {
    expect(findMatches("#e0529c", 3)).toHaveLength(3);
    expect(findMatches("#e0529c", 1)).toHaveLength(1);
  });

  it("0件以下の指定では空配列", () => {
    expect(findMatches("#e0529c", 0)).toEqual([]);
    expect(findMatches("#e0529c", -5)).toEqual([]);
  });

  it("データ件数より多く指定しても溢れない", () => {
    expect(findMatches("#e0529c", 999)).toHaveLength(JELLYFISH.length);
  });

  it("並び順は rankJellyfish の先頭と一致する", () => {
    const ranked = rankJellyfish("#7d8c4f").slice(0, 3);
    expect(findMatches("#7d8c4f", 3)).toEqual(ranked);
  });
});

describe("matchComment", () => {
  it("スコアに応じて文言が変わる", () => {
    expect(matchComment(100)).not.toBe(matchComment(60));
    expect(matchComment(60)).not.toBe(matchComment(5));
  });

  it("どのスコアでも文字列を返す", () => {
    for (const score of [0, 19, 20, 44, 45, 69, 70, 89, 90, 100]) {
      expect(matchComment(score).length).toBeGreaterThan(0);
    }
  });
});
