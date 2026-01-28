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
  }));
}

export async function postFriend(userId: string, senderId: string) {
  const { error } = await supabase.rpc("accept_friend_request", {
    p_user_id: userId,
    p_sender_id: senderId,
  });

  if (error) throw error;
}

export async function postFriendRequest(userId: string, receiverId: string) {
  // Check if userId = receiverId
  if (userId === receiverId) throw new Error("Cannot send request to yourself");

  // Check if they're already friends
  const { data: friendData, error: friendError } = await supabase
    .from("friend")
    .select("*")
    .or(
      `and(user1_id.eq.${userId},user2_id.eq.${receiverId}),and(user1_id.eq.${receiverId},user2_id.eq.${userId})`,
    );

  if (friendError) throw friendError;

  if (friendData && friendData.length > 0)
    throw new Error("Users are already friends");

  // Check if a pending friend request already exists
  const { data: requestData, error: requestError } = await supabase
    .from("friend_request")
    .select("*")
    .or(
      `and(sender_id.eq.${userId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${userId})`,
    );

  if (requestError) throw requestError;

  if (requestData && requestData.length > 0) {
    throw new Error("A friend request already exists.");
  }

  // Create a new friend request
  const { error } = await supabase.from("friend_request").insert({
    sender_id: userId,
    receiver_id: receiverId,
  });

  if (error) throw error;
}
