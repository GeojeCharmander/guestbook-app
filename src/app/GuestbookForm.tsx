"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitEntry, type GuestbookFormState } from "@/app/actions/guestbook";

const initialState: GuestbookFormState = { error: null, ok: false };

export default function GuestbookForm() {
  const [state, formAction, pending] = useActionState(submitEntry, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state.ok]);

  return (
    <form ref={formRef} action={formAction} className="gb-form" noValidate>
      <label className="field">
        <span className="sr-only">이름</span>
        <input type="text" name="name" placeholder="이름을 알려주세요" />
      </label>
      <label className="field">
        <span className="sr-only">메시지</span>
        <textarea name="message" rows={2} placeholder="짧은 인사를 남겨주세요" />
      </label>
      {state.error && <p className="form-error">{state.error}</p>}
      <button type="submit" className="submit" disabled={pending}>
        {pending ? "남기는 중..." : "남기기"}
      </button>
    </form>
  );
}
