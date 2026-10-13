import { deltaE, hexToLab, similarityScore, type Lab } from "./color";
import { JELLYFISH, type Jellyfish } from "./jellyfish";

export type JellyfishMatch = {
  jellyfish: Jellyfish;
  /** CIELAB 上の色差。小さいほど入力した色に近い。 */
  distance: number;
  /** 0〜100 の近さスコア。 */
  score: number;
};

const JELLYFISH_LAB: { jellyfish: Jellyfish; lab: Lab }[] = JELLYFISH.flatMap(
  (jellyfish) => {
    const lab = hexToLab(jellyfish.hex);
    return lab ? [{ jellyfish, lab }] : [];
  },
);

/** 入力した色に近い順に全種を並べる。色として読めない場合は空配列。 */
export function rankJellyfish(hex: string): JellyfishMatch[] {
  const target = hexToLab(hex);
  if (!target) return [];

  return JELLYFISH_LAB.map(({ jellyfish, lab }) => {
    const distance = deltaE(target, lab);
    return { jellyfish, distance, score: similarityScore(distance) };
  }).sort(
    (a, b) =>
      a.distance - b.distance || a.jellyfish.id.localeCompare(b.jellyfish.id),
  );
}

/** 近い順に上位だけ返す。 */
export function findMatches(hex: string, limit = 3): JellyfishMatch[] {
  if (limit <= 0) return [];
  return rankJellyfish(hex).slice(0, limit);
}

/** スコアに応じた一言コメント。 */
export function matchComment(score: number): string {
  if (score >= 90) return "ほぼ同じ色のクラゲがいました";
  if (score >= 70) return "かなり近い色のクラゲがいました";
  if (score >= 45) return "雰囲気の近いクラゲがいました";
  if (score >= 20) return "少し離れますが、この色がいちばん近いクラゲです";
  return "ぴったりの色はいませんが、いちばん近いのはこのクラゲです";
}
