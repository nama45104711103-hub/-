import { readableTextColor } from "@/lib/color";
import type { JellyfishMatch } from "@/lib/match";

import { JellyfishArt } from "./JellyfishArt";

function ScoreBadge({ score }: { score: number }) {
  return (
    <span className="inline-flex items-baseline gap-1 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold ring-1 ring-white/20">
      <span className="text-lg leading-none">{score}</span>
      <span className="text-xs font-normal text-white/70">点の近さ</span>
    </span>
  );
}

function Swatch({ hex, label }: { hex: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <span className="text-xs text-white/60">{label}</span>
      <div
        className="flex h-11 items-center justify-center rounded-xl text-xs font-medium ring-1 ring-white/20"
        style={{ backgroundColor: hex, color: readableTextColor(hex) }}
      >
        {hex}
      </div>
    </div>
  );
}

/** 一番近いクラゲを大きく見せるカード。 */
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
    <article className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/15 sm:p-6">
      <p className="text-sm text-cyan-200">{comment}</p>

      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start">
        <div
          className="mx-auto w-40 shrink-0 rounded-2xl bg-black/20 p-2 sm:mx-0 sm:w-44"
          style={{ boxShadow: `0 0 48px -12px ${jellyfish.accent}` }}
        >
          <JellyfishArt
            color={jellyfish.hex}
            accent={jellyfish.accent}
            className="h-auto w-full"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h2 className="text-2xl font-bold tracking-tight">{jellyfish.name}</h2>
            <ScoreBadge score={score} />
          </div>
          <p className="mt-1 text-sm italic text-white/60">{jellyfish.scientific}</p>

          <div className="mt-4 flex gap-3">
            <Swatch hex={inputHex} label="あなたの色" />
            <Swatch hex={jellyfish.hex} label="クラゲの色" />
          </div>

          <dl className="mt-4 space-y-1.5 text-sm">
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-white/55">色</dt>
              <dd className="min-w-0">{jellyfish.colorLabel}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-white/55">大きさ</dt>
              <dd className="min-w-0">{jellyfish.size}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 shrink-0 text-white/55">すみか</dt>
              <dd className="min-w-0">{jellyfish.habitat}</dd>
            </div>
          </dl>

          <p className="mt-4 text-sm leading-relaxed text-white/85">
            {jellyfish.description}
          </p>

          {jellyfish.caution ? (
            <p className="mt-3 rounded-xl bg-amber-300/10 px-3 py-2 text-sm text-amber-100 ring-1 ring-amber-200/30">
              ⚠ {jellyfish.caution}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** 2番目以降の候補を並べる小さめのカード。 */
export function JellyfishCard({ match }: { match: JellyfishMatch }) {
  const { jellyfish, score } = match;

  return (
    <article className="flex gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="w-16 shrink-0 self-start">
        <JellyfishArt
          color={jellyfish.hex}
          accent={jellyfish.accent}
          className="h-auto w-full"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <h3 className="font-bold">{jellyfish.name}</h3>
          <span className="text-sm text-white/70">{score}点</span>
        </div>
        <p className="text-xs italic text-white/50">{jellyfish.scientific}</p>
        <p className="mt-2 text-sm text-white/80">{jellyfish.colorLabel}</p>
        <p className="mt-1 text-xs text-white/60">{jellyfish.habitat}</p>
      </div>
    </article>
  );
}

/** 全種一覧用の1行表示。 */
export function JellyfishRow({ match }: { match: JellyfishMatch }) {
  const { jellyfish, score } = match;

  return (
    <li className="flex items-center gap-3 py-2">
      <span
        className="size-6 shrink-0 rounded-full ring-1 ring-white/25"
        style={{ backgroundColor: jellyfish.hex }}
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1 truncate text-sm">{jellyfish.name}</span>
      <span className="shrink-0 text-xs text-white/60">{jellyfish.colorLabel}</span>
      <span className="w-10 shrink-0 text-right text-sm tabular-nums text-white/80">
        {score}
      </span>
    </li>
  );
}
