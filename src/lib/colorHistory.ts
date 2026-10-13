import { normalizeHex } from "./color";

const STORAGE_KEY = "jellyfish-color-finder:history";
export const HISTORY_MAX = 8;

const EMPTY: string[] = [];

/** 保存されている文字列を、色コードの配列として読み直す。壊れていても落ちない。 */
export function parseHistory(raw: string | null): string[] {
  if (!raw) return EMPTY;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return EMPTY;
  }
  if (!Array.isArray(parsed)) return EMPTY;

  const normalized = parsed
    .filter((value): value is string => typeof value === "string")
    .map((value) => normalizeHex(value))
    .filter((value): value is string => value !== null);

  return Array.from(new Set(normalized)).slice(0, HISTORY_MAX);
}

/** 先頭に色を足した履歴を作る（重複は前に詰め直す）。 */
export function withColor(history: string[], hex: string): string[] {
  const normalized = normalizeHex(hex);
  if (!normalized) return history;
  return [normalized, ...history.filter((value) => value !== normalized)].slice(
    0,
    HISTORY_MAX,
  );
}

// localStorage を外部ストアとして扱うための最小の仕組み。
// useSyncExternalStore に渡すため、変化がない間は同じ配列を返し続ける。
let snapshot: string[] | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function write(history: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // プライベートモードなどで保存できなくても、画面の動作は続ける。
  }
}

export function subscribeHistory(listener: () => void): () => void {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) return;
    snapshot = null;
    emit();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getHistorySnapshot(): string[] {
  if (snapshot === null) {
    try {
      snapshot = parseHistory(window.localStorage.getItem(STORAGE_KEY));
    } catch {
      snapshot = EMPTY;
    }
  }
  return snapshot;
}

export function getHistoryServerSnapshot(): string[] {
  return EMPTY;
}

export function addHistoryColor(hex: string) {
  const next = withColor(getHistorySnapshot(), hex);
  if (next === snapshot) return;
  snapshot = next;
  write(next);
  emit();
}

export function clearHistory() {
  snapshot = EMPTY;
  write(EMPTY);
  emit();
}
