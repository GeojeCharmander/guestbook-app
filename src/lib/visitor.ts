const STORAGE_KEY = "guestbook_visitor_token";

export function getVisitorToken(): string {
  if (typeof window === "undefined") return "";

  let token = window.localStorage.getItem(STORAGE_KEY);
  if (!token) {
    token = crypto.randomUUID();
    window.localStorage.setItem(STORAGE_KEY, token);
  }
  return token;
}
