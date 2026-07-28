import { supabase } from "@/lib/supabase";

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export async function getEntries(): Promise<GuestbookEntry[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("id, name, message, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    message: row.message,
    createdAt: row.created_at,
  }));
}

export async function addEntry(name: string, message: string): Promise<void> {
  const { error } = await supabase
    .from("posts")
    .insert({ name, message });

  if (error) throw error;
}
