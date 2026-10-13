"use client";

import Image from "next/image";
import { useState } from "react";

import { JellyfishArt } from "./JellyfishArt";

type Props = {
  /** クラゲのid。`public/jellyfish/<id>.webp` を読む。 */
  id: string;
  name: string;
  color: string;
  accent: string;
  /** 画面上で表示される幅の目安。読み込む画像サイズの判断に使う。 */
  sizes: string;
};

/**
 * クラゲの写真を表示する。
 * 画像が無い・読み込めない場合は、これまでのSVGイラストに戻す。
 */
export function JellyfishPhoto({ id, name, color, accent, sizes }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <JellyfishArt color={color} accent={accent} className="h-full w-full" />;
  }

  return (
    <Image
      src={`/jellyfish/${id}.webp`}
      alt={`${name}のイメージ画像`}
      fill
      sizes={sizes}
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}
