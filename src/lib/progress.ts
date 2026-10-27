/** Free-course progress, kept in the visitor's own browser (no accounts). */
const KEY = "parhoai-python-done";
const EVT = "parhoai-progress";

export function doneSet(): Set<string> {
  try { return new Set(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { return new Set(); }
}
export const isDone = (slug: string) => doneSet().has(slug);
export function setDone(slug: string, value: boolean) {
  const s = doneSet();
  value ? s.add(slug) : s.delete(slug);
  try { localStorage.setItem(KEY, JSON.stringify([...s])); } catch { /* private mode: progress just isn't kept */ }
  window.dispatchEvent(new Event(EVT));
}
export function onProgress(fn: () => void) {
  window.addEventListener(EVT, fn); window.addEventListener("storage", fn);
  return () => { window.removeEventListener(EVT, fn); window.removeEventListener("storage", fn); };
}
