import { supabase } from "./supabase";

export async function getFriends(userId: string, query: string = "") {
  const { data, error } = await supabase
    .from("friend")
    .select(
      `
        user1:user!Friends_user1_id_fkey (
          id,
          username,
          realname,
          image_url
        ),
        user2:user!Friends_user2_id_fkey (
          id,
          username,
          realname,
          image_url
        )
      `,
    )
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);

  if (error) throw error;

  const friends = data.map((row) =>
    row.user1.id === userId ? row.user2 : row.user1,
  );

  if (query) {
    return friends.filter(
      (friend) =>
        friend.username.toLowerCase().includes(query.toLowerCase()) ||
        friend.realname.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return friends;
}

export async function getFriendRequests(userId: string) {
  const { data, error } = await supabase
    .from("friend_request")
    .select(
      `
        sender_id,
        is_pending,
        user!friend_request_sender_id_fkey (
          username,
          image_url
        )
      `,
    )
    .eq("receiver_id", userId);

  if (error) throw error;

  return data.map((row) => ({
    ...row.user,
    user_id: row.sender_id,
    is_pending: row.is_pending,
  }));
}
