import { readableTextColor } from "@/lib/color";
import type { JellyfishMatch } from "@/lib/match";

import { JellyfishPhoto } from "./JellyfishPhoto";

/** 入力した色とクラゲの色を並べる1枚分の色見本。 */
function Swatch({ hex, label }: { hex: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <span className="text-[0.8125rem] text-white/70">{label}</span>
      <div
        className="flex h-12 items-center justify-center rounded-xl text-[0.8125rem] font-medium tabular-nums ring-1 ring-white/25"
        style={{ backgroundColor: hex, color: readableTextColor(hex) }}
      >
        {hex}
      </div>
    </div>
  );
}

/** クラゲの写真を縦横比3:4の枠に収める。画像が無い場合はイラストに戻る。 */
function ArtFrame({
  id,
  name,
  color,
  accent,
  className,
  sizes,
}: {
  id: string;
  name: string;
  color: string;
  accent: string;
  className?: string;
  sizes: string;
}) {
  return (
    <div
      className={`relative aspect-[3/4] overflow-hidden rounded-2xl bg-black/25 ring-1 ring-white/10 ${className ?? ""}`}
      style={{ boxShadow: `0 0 60px -22px ${accent}` }}
    >
      <JellyfishPhoto id={id} name={name} color={color} accent={accent} sizes={sizes} />
    </div>
  );
}

/** 一番近いクラゲを主役として見せるカード。 */
export function FeaturedJellyfishCard({
  match,
  inputHex,
  comment,
}: {
  match: JellyfishMatch;
  inputHex: string;
  comment: string;
}) {
  const { jellyfish, score } = match;

  return (
    <article className="rounded-3xl bg-white/[0.07] p-5 ring-1 ring-white/15 sm:p-8">
      <p className="text-[0.9375rem] font-medium leading-relaxed text-cyan-200">
        {comment}
      </p>

      <div className="mt-5 flex flex-col gap-6 sm:mt-6 sm:flex-row sm:gap-8">
        <ArtFrame
          id={jellyfish.id}
          name={jellyfish.name}
          color={jellyfish.hex}
          accent={jellyfish.accent}
          className="mx-auto w-full max-w-[220px] shrink-0 sm:mx-0 sm:w-[240px] sm:max-w-none"
          sizes="(min-width: 640px) 240px, 220px"
        />

        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-snug tracking-tight break-words sm:text-[1.625rem]">
            {jellyfish.name}
          </h2>
          <p className="mt-1.5 text-[0.875rem] leading-relaxed break-words text-white/70 italic">
            {jellyfish.scientific}
          </p>

          <div className="mt-5 rounded-2xl bg-black/20 p-4 ring-1 ring-white/10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <span className="text-[0.8125rem] font-medium text-white/80">
                色の近さ
              </span>
              <span className="text-[0.8125rem] text-white/70">
                <span className="text-2xl font-bold tabular-nums text-white">
                  {score}
                </span>{" "}
                / 100 点
              </span>
            </div>
            <div className="mt-3 flex gap-3">
              <Swatch hex={inputHex} label="あなたの色" />
              <Swatch hex={jellyfish.hex} label="クラゲの色" />
            </div>
          </div>

          <dl className="mt-5 space-y-2 text-[0.9375rem] leading-relaxed">
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-white/70">色</dt>
              <dd className="min-w-0 break-words">{jellyfish.colorLabel}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-white/70">大きさ</dt>
              <dd className="min-w-0 break-words">{jellyfish.size}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="w-16 shrink-0 text-white/70">すみか</dt>
              <dd className="min-w-0 break-words">{jellyfish.habitat}</dd>
            </div>
          </dl>

          <p className="mt-6 text-base leading-[1.75] text-white/90">
            {jellyfish.description}
          </p>

          {jellyfish.caution ? (
            <p className="mt-5 rounded-xl bg-amber-300/10 px-4 py-3 text-[0.9375rem] leading-relaxed text-amber-100 ring-1 ring-amber-200/30">
              <span aria-hidden="true">⚠ </span>
              <span className="sr-only">注意: </span>
              {jellyfish.caution}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** 2位・3位を見せるカード。 */
export function JellyfishCard({
  match,
  rank,
}: {
  match: JellyfishMatch;
  rank: number;
}) {
  const { jellyfish, score } = match;

  return (
    <article className="flex gap-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10 sm:gap-5 sm:p-5">
      <ArtFrame
        id={jellyfish.id}
        name={jellyfish.name}
        color={jellyfish.hex}
        accent={jellyfish.accent}
        className="w-24 shrink-0 self-start sm:w-28"
        sizes="(min-width: 640px) 112px, 96px"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.75rem] font-medium text-white/80 ring-1 ring-white/15">
            {rank}位
          </span>
          <h3 className="text-[1.0625rem] font-bold break-words">
            {jellyfish.name}
          </h3>
        </div>
        <p className="mt-1 text-[0.8125rem] leading-relaxed break-words text-white/65 italic">
          {jellyfish.scientific}
        </p>
        <p className="mt-2.5 text-[0.9375rem] leading-relaxed break-words text-white/90">
          {jellyfish.colorLabel}
        </p>
        <p className="mt-1 text-[0.8125rem] leading-relaxed break-words text-white/70">
          {jellyfish.habitat}
        </p>
        <p className="mt-3 text-[0.8125rem] text-white/75">
          色の近さ{" "}
          <span className="text-base font-semibold tabular-nums text-white">
            {score}
          </span>{" "}
          点
        </p>
      </div>
    </article>
  );
}
