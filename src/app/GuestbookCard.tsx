"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { GuestbookEntry } from "@/lib/entries";

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}.${d.getDate()}`;
}

const AVATAR_TONES = ["clay", "sage", "mix"] as const;

function avatarTone(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_TONES[hash % AVATAR_TONES.length];
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6M6 6l.6 9.4a1.5 1.5 0 0 0 1.5 1.6h3.8a1.5 1.5 0 0 0 1.5-1.6L14 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  entry: GuestbookEntry;
  isMine: boolean;
  visitorToken: string;
  onDeleted: (id: string) => void;
};

export default function GuestbookCard({ entry, isMine, visitorToken, onDeleted }: Props) {
  const [likes, setLikes] = useState(entry.likes);
  const [liked, setLiked] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleLike() {
    if (liked) return;
    setLiked(true);
    setLikes((n) => n + 1);
    const { error } = await supabase.rpc("increment_post_likes", { post_id: entry.id });
    if (error) {
      setLiked(false);
      setLikes((n) => n - 1);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    const { data, error } = await supabase.rpc("delete_post", {
      post_id: entry.id,
      token: visitorToken,
    });
    if (!error && data) {
      onDeleted(entry.id);
    } else {
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <li className="entry-card" data-tone={avatarTone(entry.name)}>
      <span className="avatar">{entry.name.charAt(0)}</span>
      <div className="entry">
        <div className="row-top">
          <b>{entry.name}</b>
          <time>{formatDate(entry.createdAt)}</time>
        </div>
        <p>{entry.message}</p>

        {confirming ? (
          <div className="confirm-bar">
            <span>정말 삭제할까요?</span>
            <div className="confirm-actions">
              <button type="button" className="confirm-cancel" onClick={() => setConfirming(false)}>
                취소
              </button>
              <button
                type="button"
                className="confirm-delete"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "삭제 중..." : "삭제"}
              </button>
            </div>
          </div>
        ) : (
          <div className="entry-actions">
            <button
              type="button"
              className={`like-btn${liked ? " is-liked" : ""}`}
              onClick={handleLike}
              disabled={liked}
              aria-label="좋아요"
            >
              <span className="like-heart" aria-hidden="true">
                ♥
              </span>
              <span>{likes}</span>
            </button>
            {isMine && (
              <button
                type="button"
                className="delete-btn"
                onClick={() => setConfirming(true)}
                aria-label="내 글 삭제"
              >
                <TrashIcon />
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
