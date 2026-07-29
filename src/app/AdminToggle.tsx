"use client";

import { useEffect, useRef, useState } from "react";
import { verifyAdminPassword } from "@/app/actions/admin";
import { useAdmin } from "./AdminProvider";

function KeyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="7" cy="13" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9.2 10.8 15 5m0 0v3m0-3h-3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AdminToggle() {
  const { isAdmin, login, logout } = useAdmin();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const popoverRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
        setPassword("");
        setError(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError(null);
    const ok = await verifyAdminPassword(password);
    setChecking(false);
    if (ok) {
      login(password);
      setOpen(false);
      setPassword("");
    } else {
      setError("비밀번호가 올바르지 않아요.");
    }
  }

  if (isAdmin) {
    return (
      <button type="button" className="toolbar-btn is-admin" onClick={logout}>
        관리자 모드 · 끄기
      </button>
    );
  }

  if (open) {
    return (
      <form ref={popoverRef} className="admin-popover" onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="관리자 비밀번호"
          autoFocus
        />
        <button type="submit" disabled={checking}>
          {checking ? "확인 중..." : "확인"}
        </button>
        {error && <p className="admin-error">{error}</p>}
      </form>
    );
  }

  return (
    <button
      type="button"
      className="toolbar-btn"
      onClick={() => setOpen(true)}
      aria-label="관리자 모드"
    >
      <KeyIcon />
    </button>
  );
}
