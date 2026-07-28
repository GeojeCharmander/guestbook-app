"use server";

import { revalidatePath } from "next/cache";
import { addEntry } from "@/lib/entries";

export type GuestbookFormState = {
  error: string | null;
  ok: boolean;
};

export async function submitEntry(
  _prevState: GuestbookFormState,
  formData: FormData
): Promise<GuestbookFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const authorToken = String(formData.get("authorToken") ?? "");

  if (!name || !message) {
    return { error: "이름과 메시지를 모두 입력해주세요.", ok: false };
  }

  await addEntry(name, message, authorToken);
  revalidatePath("/");
  return { error: null, ok: true };
}
