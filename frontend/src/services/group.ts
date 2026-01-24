import { supabase } from "./supabase";

export async function getGroups(userId: string, query: string = "") {
  const { data, error } = await supabase
    .from("user_group")
    .select(
      `
        balance,
        group (
          id,
          name,
          image_url
        )
      `,
    )
    .eq("user_id", userId)
    .ilike("group.name", `%${query}%`);

  if (error) throw error;

  return data.map((row) => ({ ...row.group, balance: row.balance }));
}
