import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-4 px-4 py-16">
      <h1 className="text-2xl font-bold">ページが見つかりません</h1>
      <Link href="/" className="text-sm underline">
        トップへ戻る
      </Link>
    </main>
  );
}
