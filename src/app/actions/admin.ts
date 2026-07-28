"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

function isCorrectPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && password === expected;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return isCorrectPassword(password);
}

export async function adminDeletePost(
  id: string,
  password: string
): Promise<{ ok: boolean; error?: string }> {
  if (!isCorrectPassword(password)) {
    return { ok: false, error: "비밀번호가 올바르지 않아요." };
  }

  const { data, error } = await supabase.rpc("admin_delete_post", { post_id: id });
  if (error || !data) {
    return { ok: false, error: "삭제하지 못했어요." };
  }

  revalidatePath("/");
  return { ok: true };
}
