import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-4 px-4 py-16">
      <h1 className="text-2xl font-bold">ページが見つかりません</h1>
      <p className="text-sm text-white/70">
        お探しのページはありませんでした。トップから色を探してみてください。
      </p>
      <Link
        href="/"
        className="w-fit rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-200"
      >
        トップへ戻る
      </Link>
    </main>
  );
}
