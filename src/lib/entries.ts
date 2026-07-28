import { supabase } from "@/lib/supabase";

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  likes: number;
  authorToken: string | null;
};

export async function getEntries(): Promise<GuestbookEntry[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, name, message, created_at, likes, author_token")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    message: row.message,
    createdAt: row.created_at,
    likes: row.likes ?? 0,
    authorToken: row.author_token,
  }));
}

export async function addEntry(
  name: string,
  message: string,
  authorToken: string
): Promise<void> {
  const { error } = await supabase
    .from("posts")
    .insert({ name, message, author_token: authorToken });

  if (error) throw error;
}
