"use client";

import { useEffect } from "react";

/** オフライン対応のためにサービスワーカーを登録する。失敗しても画面には影響させない。 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // 登録できない環境（プライベートモードなど）でも通常どおり動かす。
      });
    };

    if (document.readyState === "complete") {
      register();
      return;
    }
    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
