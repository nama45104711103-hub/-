"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

import { FeaturedJellyfishCard, JellyfishCard } from "@/components/JellyfishCard";
import { normalizeHex, readableTextColor } from "@/lib/color";
import {
  addHistoryColor,
  clearHistory,
  getHistoryServerSnapshot,
  getHistorySnapshot,
  subscribeHistory,
} from "@/lib/colorHistory";
import { PRESET_COLORS, resolveColor, type ResolvedColor } from "@/lib/colorNames";
import { JELLYFISH } from "@/lib/jellyfish";
import { matchComment, rankJellyfish } from "@/lib/match";

/** 入力欄やボタンの共通フォーカス表示。 */
const FOCUS_RING =
  "outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07263c]";

export default function Home() {
  const [input, setInput] = useState("");
  const [color, setColor] = useState<ResolvedColor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const history = useSyncExternalStore(
    subscribeHistory,
    getHistorySnapshot,
    getHistoryServerSnapshot,
  );

  const ranked = useMemo(() => (color ? rankJellyfish(color.hex) : []), [color]);
  const top = ranked[0];
  const runnersUp = ranked.slice(1, 3);

  function search(raw: string) {
    const resolved = resolveColor(raw);
    if (!resolved) {
      setColor(null);
      setError(
        raw.trim()
          ? "この言葉は色として読み取れませんでした。「水色」「#7fcce3」のように入力するか、下の色ボタンを押してみてください。"
          : "色名か色コードを入力してください。",
      );
      return;
    }

    setError(null);
    setColor(resolved);
    addHistoryColor(resolved.hex);
  }

  const pickerValue = color?.hex ?? normalizeHex(input) ?? "#7fcce3";

  return (
    <main className="flex w-full flex-1 flex-col gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14">
      <div className="mx-auto flex w-full max-w-[740px] flex-col gap-8">
        <header className="flex flex-col gap-3">
          <h1 className="text-[1.75rem] leading-tight font-bold tracking-tight sm:text-4xl">
            クラゲカラーファインダー
          </h1>
          <p className="text-base leading-relaxed text-white/80">
            好きな色を入れると、その色に近いクラゲを {JELLYFISH.length}{" "}
            種のなかから探します。色名でも色コードでも大丈夫です。
          </p>
        </header>

        <section className="rounded-3xl bg-white/[0.07] p-5 ring-1 ring-white/15 sm:p-6">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              search(input);
            }}
            className="flex flex-col gap-3"
          >
            <label htmlFor="color-input" className="text-base font-medium">
              好きな色
            </label>
            <div className="flex gap-3">
              <input
                id="color-input"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="水色 / ピンク / #7fcce3"
                autoComplete="off"
                className={`h-14 min-w-0 flex-1 rounded-xl bg-white/10 px-4 text-base ring-1 ring-white/20 placeholder:text-white/50 ${FOCUS_RING}`}
              />
              <button
                type="submit"
                className={`h-14 shrink-0 rounded-xl bg-cyan-300 px-6 text-base font-bold text-slate-900 transition-colors hover:bg-cyan-200 ${FOCUS_RING}`}
              >
                探す
              </button>
            </div>

            <div className="mt-1 flex items-center gap-3">
              <label htmlFor="color-picker" className="text-[0.9375rem] text-white/80">
                色見本から選ぶ
              </label>
              <input
                id="color-picker"
                type="color"
                value={pickerValue}
                onChange={(event) => {
                  setInput(event.target.value);
                  search(event.target.value);
                }}
                className={`size-12 shrink-0 cursor-pointer rounded-xl bg-transparent ring-1 ring-white/25 ${FOCUS_RING}`}
                aria-label="色を選ぶ"
              />
            </div>
          </form>

          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="色の候補">
            {PRESET_COLORS.map((preset) => {
              const selected = color?.hex === preset.hex;
              return (
                <button
                  key={preset.hex}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setInput(preset.label);
                    search(preset.label);
                  }}
                  className={`flex min-h-11 items-center gap-2 rounded-full py-1.5 pr-4 pl-2 text-[0.9375rem] transition-colors ${FOCUS_RING} ${
                    selected
                      ? "bg-white/20 font-semibold ring-2 ring-cyan-300"
                      : "bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
                  }`}
                >
                  <span
                    className="flex size-7 items-center justify-center rounded-full text-[0.8125rem] font-bold ring-1 ring-white/35"
                    style={{
                      backgroundColor: preset.hex,
                      color: readableTextColor(preset.hex),
                    }}
                    aria-hidden="true"
                  >
                    {selected ? "✓" : ""}
                  </span>
                  {preset.label}
                  {selected ? <span className="sr-only">（選択中）</span> : null}
                </button>
              );
            })}
          </div>

          {error ? (
            <p
              role="status"
              className="mt-5 rounded-xl bg-rose-300/10 px-4 py-3 text-[0.9375rem] leading-relaxed text-rose-100 ring-1 ring-rose-200/30"
            >
              {error}
            </p>
          ) : null}

          {history.length > 0 ? (
            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[0.8125rem] font-medium text-white/70">
                  最近試した色
                </h2>
                <button
                  type="button"
                  onClick={clearHistory}
                  className={`-mr-2 flex min-h-11 items-center rounded-lg px-2 text-[0.8125rem] text-white/70 underline transition-colors hover:text-white ${FOCUS_RING}`}
                >
                  履歴を消去
                </button>
              </div>
              <div
                className="-mx-1 mt-1 flex gap-2 overflow-x-auto px-1 pt-1 pb-2"
                role="group"
                aria-label="最近試した色（横にスクロールできます）"
              >
                {history.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => {
                      setInput(hex);
                      search(hex);
                    }}
                    className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-white/[0.08] py-1.5 pr-3 pl-1.5 text-[0.8125rem] tabular-nums ring-1 ring-white/15 transition-colors hover:bg-white/20 ${FOCUS_RING}`}
                  >
                    <span
                      className="size-7 rounded-full ring-1 ring-white/30"
                      style={{ backgroundColor: hex }}
                      aria-hidden="true"
                    />
                    {hex}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      </div>

      {top && color ? (
        <div className="mx-auto flex w-full max-w-[960px] flex-col gap-8">
          <FeaturedJellyfishCard
            match={top}
            inputHex={color.hex}
            comment={matchComment(top.score)}
          />

          {runnersUp.length > 0 ? (
            <section className="flex flex-col gap-4">
              <h2 className="text-base font-semibold text-white/85">
                次に近いクラゲ
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {runnersUp.map((match, index) => (
                  <JellyfishCard
                    key={match.jellyfish.id}
                    match={match}
                    rank={index + 2}
                  />
                ))}
              </div>
            </section>
          ) : null}

        </div>
      ) : (
        <div className="mx-auto w-full max-w-[740px]">
          <section className="rounded-3xl border border-dashed border-white/25 px-5 py-12 text-center">
            <p className="text-base leading-relaxed text-white/85">
              色を入力すると、ここに近いクラゲが出ます。
            </p>
            <p className="mt-2 text-[0.875rem] leading-relaxed text-white/70">
              例: 水色、ピンク、金色、透明、#884898
            </p>
          </section>
        </div>
      )}

      <footer className="mx-auto mt-auto w-full max-w-[740px] pt-6 text-[0.8125rem] leading-relaxed text-white/70">
        <p>
          クラゲの色は個体差や光の当たり方で大きく変わります。ここで使っている色は、よく見られる色の目安です。
        </p>
        <p className="mt-2">
          色の近さは CIELAB 色空間での色差（ΔE）から計算しています。
        </p>
        <p className="mt-2">
          掲載しているクラゲの画像は、生成AIで作成したイメージです。実際の個体の写真ではありません。
        </p>
      </footer>
    </main>
  );
}
