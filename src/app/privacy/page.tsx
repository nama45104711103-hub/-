import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜クラゲカラーファインダー",
  description:
    "クラゲカラーファインダーのプライバシーポリシー。個人情報の収集は行っていません。",
};

const UPDATED_AT = "2026年10月13日";

export default function PrivacyPage() {
  return (
    <main className="mx-auto flex w-full max-w-[740px] flex-1 flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">
      <header className="flex flex-col gap-2">
        <h1 className="text-[1.75rem] leading-tight font-bold tracking-tight sm:text-4xl">
          プライバシーポリシー
        </h1>
        <p className="text-[0.8125rem] text-white/70">最終更新日: {UPDATED_AT}</p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">収集する情報</h2>
        <p className="text-base leading-relaxed text-white/85">
          このアプリは、氏名、メールアドレス、電話番号、位置情報などの個人情報を一切収集しません。
          利用者を識別するための仕組みも持っていません。
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">端末に保存される情報</h2>
        <p className="text-base leading-relaxed text-white/85">
          検索に使った色のコード（例: #7fcce3）を、最大8件まで端末のブラウザ内（localStorage）に保存します。
          これは「最近試した色」を表示するためだけに使い、外部に送信することはありません。
          アプリ内の「履歴を消去」を押すか、ブラウザのデータを削除すると、いつでも消せます。
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">色の判定について</h2>
        <p className="text-base leading-relaxed text-white/85">
          入力した色とクラゲの色の比較は、すべて利用者の端末の中で計算しています。
          入力内容がサーバーに送られることはありません。
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">広告・解析ツール</h2>
        <p className="text-base leading-relaxed text-white/85">
          広告は表示しません。アクセス解析ツールや広告識別子も使用していません。
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">第三者への提供</h2>
        <p className="text-base leading-relaxed text-white/85">
          収集している情報がないため、第三者に提供する情報もありません。
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">子どもの利用について</h2>
        <p className="text-base leading-relaxed text-white/85">
          年齢に関係なく安全に利用できます。個人情報を収集しないため、保護者の同意を必要とする情報の取得もありません。
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold">内容の変更</h2>
        <p className="text-base leading-relaxed text-white/85">
          このポリシーを変更した場合は、このページに掲載し、最終更新日を書き換えます。
        </p>
      </section>

      <Link
        href="/"
        className="w-fit rounded-xl bg-cyan-300 px-4 py-3 text-[0.9375rem] font-semibold text-slate-900 transition-colors hover:bg-cyan-200"
      >
        トップへ戻る
      </Link>
    </main>
  );
}
