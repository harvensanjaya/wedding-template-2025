export const WISH_SUBMITTED_EVENT = "wish:submitted";

export function emitWishSubmitted() {
  window.dispatchEvent(new CustomEvent(WISH_SUBMITTED_EVENT));
}

export function onWishSubmitted(callback: () => void): () => void {
  window.addEventListener(WISH_SUBMITTED_EVENT, callback);
  return () => window.removeEventListener(WISH_SUBMITTED_EVENT, callback);
}
