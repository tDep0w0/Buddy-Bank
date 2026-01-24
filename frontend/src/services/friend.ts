import { supabase } from "./supabase";

export async function getFriends(userId: string) {
  const { data, error } = await supabase
    .from("friends")
    .select(
      `
        user1:users!Friends_user1_id_fkey (
          id,
          username,
          realname,
          image_url
        ),
        user2:users!Friends_user2_id_fkey (
          id,
          username,
          realname,
          image_url
        )
      `,
    )
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);

  if (error) throw error;

  return data.map((row) => (row.user1.id !== userId ? row.user1 : row.user2));
}
