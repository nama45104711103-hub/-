"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

import {
  FeaturedJellyfishCard,
  JellyfishCard,
  JellyfishRow,
} from "@/components/JellyfishCard";
import { normalizeHex } from "@/lib/color";
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

export default function Home() {
  const [input, setInput] = useState("");
  const [color, setColor] = useState<ResolvedColor | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
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
    setShowAll(false);
    addHistoryColor(resolved.hex);
  }

  const pickerValue = color?.hex ?? normalizeHex(input) ?? "#7fcce3";

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10 sm:py-14">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          クラゲカラーファインダー
        </h1>
        <p className="text-sm leading-relaxed text-white/70">
          好きな色を入れると、その色に近いクラゲを {JELLYFISH.length}{" "}
          種のなかから探します。色名でも色コードでも大丈夫です。
        </p>
      </header>

      <section className="rounded-3xl bg-white/5 p-4 ring-1 ring-white/15 sm:p-5">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            search(input);
          }}
          className="flex flex-col gap-3"
        >
          <label htmlFor="color-input" className="text-sm font-medium">
            好きな色
          </label>
          <div className="flex gap-2">
            <input
              id="color-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="水色 / ピンク / #7fcce3"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-xl bg-white/10 px-4 py-3 text-base outline-none ring-1 ring-white/15 placeholder:text-white/40 focus:ring-2 focus:ring-cyan-300/70"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-cyan-300 px-4 py-3 font-semibold text-slate-900 transition hover:bg-cyan-200"
            >
              探す
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="color-picker"
              className="text-sm text-white/70"
            >
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
              className="size-10 shrink-0 cursor-pointer rounded-lg bg-transparent"
              aria-label="色を選ぶ"
            />
          </div>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {PRESET_COLORS.map((preset) => (
            <button
              key={preset.hex}
              type="button"
              onClick={() => {
                setInput(preset.label);
                search(preset.label);
              }}
              className="flex items-center gap-2 rounded-full bg-white/10 py-1.5 pl-1.5 pr-3 text-sm ring-1 ring-white/15 transition hover:bg-white/20"
            >
              <span
                className="size-5 rounded-full ring-1 ring-white/30"
                style={{ backgroundColor: preset.hex }}
                aria-hidden="true"
              />
              {preset.label}
            </button>
          ))}
        </div>

        {error ? (
          <p
            role="status"
            className="mt-4 rounded-xl bg-rose-300/10 px-3 py-2 text-sm text-rose-100 ring-1 ring-rose-200/30"
          >
            {error}
          </p>
        ) : null}
      </section>

      {history.length > 0 ? (
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-medium text-white/70">最近試した色</h2>
            <button
              type="button"
              onClick={clearHistory}
              className="text-xs text-white/50 underline transition hover:text-white/80"
            >
              消す
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => {
                  setInput(hex);
                  search(hex);
                }}
                className="flex items-center gap-2 rounded-full bg-white/5 py-1 pl-1 pr-3 text-xs ring-1 ring-white/10 transition hover:bg-white/15"
              >
                <span
                  className="size-5 rounded-full ring-1 ring-white/25"
                  style={{ backgroundColor: hex }}
                  aria-hidden="true"
                />
                {hex}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {top && color ? (
        <section className="flex flex-col gap-4">
          <FeaturedJellyfishCard
            match={top}
            inputHex={color.hex}
            comment={matchComment(top.score)}
          />

          {runnersUp.length > 0 ? (
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-medium text-white/70">次に近いクラゲ</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {runnersUp.map((match) => (
                  <JellyfishCard key={match.jellyfish.id} match={match} />
                ))}
              </div>
            </div>
          ) : null}

          <div className="rounded-2xl bg-white/5 ring-1 ring-white/10">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              aria-expanded={showAll}
              className="flex w-full items-center justify-between gap-2 px-4 py-3 text-sm font-medium"
            >
              <span>{JELLYFISH.length} 種すべての近さを見る</span>
              <span aria-hidden="true">{showAll ? "▲" : "▼"}</span>
            </button>
            {showAll ? (
              <ul className="divide-y divide-white/10 border-t border-white/10 px-4 py-2">
                {ranked.map((match) => (
                  <JellyfishRow key={match.jellyfish.id} match={match} />
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="rounded-3xl border border-dashed border-white/20 px-5 py-10 text-center">
          <p className="text-sm text-white/70">
            色を入力すると、ここに近いクラゲが出ます。
          </p>
          <p className="mt-2 text-xs text-white/50">
            例: 水色、ピンク、金色、透明、#884898
          </p>
        </section>
      )}

      <footer className="mt-auto pt-4 text-xs leading-relaxed text-white/45">
        <p>
          クラゲの色は個体差や光の当たり方で大きく変わります。ここで使っている色は、よく見られる色の目安です。
        </p>
        <p className="mt-1">
          色の近さは CIELAB 色空間での色差（ΔE）から計算しています。
        </p>
      </footer>
    </main>
  );
}
