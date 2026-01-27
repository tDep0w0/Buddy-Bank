import { supabase } from "./supabase";

export async function getBalances(groupId: string) {
  const { data, error } = await supabase
    .from("user_group")
    .select(
      `
        balance,
        user (
          username,
          image_url
        )
      `,
    )
    .eq("group_id", groupId);

  if (error) throw error;

  return data.map((row) => ({
    balance: row.balance,
    username: row.user.username,
    avatar_url: row.user.image_url,
  }));
}
