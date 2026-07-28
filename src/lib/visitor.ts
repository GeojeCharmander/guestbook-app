const TOKEN_KEY = "guestbook_visitor_token";
const LIKED_KEY = "guestbook_liked_posts";

export function getVisitorToken(): string {
  if (typeof window === "undefined") return "";

  let token = window.localStorage.getItem(TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID();
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  return token;
}

function readLikedIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(LIKED_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeLikedIds(ids: Set<string>) {
  window.localStorage.setItem(LIKED_KEY, JSON.stringify([...ids]));
}

export function hasLikedPost(postId: string): boolean {
  return readLikedIds().has(postId);
}

export function setPostLiked(postId: string, liked: boolean) {
  const ids = readLikedIds();
  if (liked) {
    ids.add(postId);
  } else {
    ids.delete(postId);
  }
  writeLikedIds(ids);
}
