import { supabase } from "./supabase";

export async function getBalances(groupId: string, userId: string) {
  const { data, error } = await supabase
    .from("user_group")
    .select(
      `
        balance,
        user (
          id,
          username,
          image_url
        )
      `,
    )
    .eq("group_id", groupId);

  if (error) throw error;

  return data.map((row) => ({
    balance: row.balance,
    user: {
      id: row.user.id,
      username: row.user.id === userId ? "You" : row.user.username,
      image_url: row.user.image_url,
    },
  }));
}
