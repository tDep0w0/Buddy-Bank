import { supabase } from "./supabase";
import { Database } from "@/types/database";

type UserUpdate = Database["public"]["Tables"]["user"]["Update"]; 

export async function updateUserProfile(
  uid: string,
  payload: Partial<UserUpdate>,
): Promise<void> {
  const { error } = await supabase.from("user").update(payload).eq("id", uid);
  if (error) throw error;
}

export type UserProfile = {
  id: string;
  email: string;
  username: string | null;
  realname: string | null;
  image_url: string | null;
};

/**
 * Get the current user's profile (and email from the authentication).
 * If you pass a UID, it must match the currently logged-in user (clients do not have permission to read other people's emails).
 */
export async function getUserProfile(uid?: string): Promise<UserProfile> {
  const { data: authData, error: authErr } = await supabase.auth.getUser();
  if (authErr) throw authErr;

  const id = uid ?? authData.user?.id ?? null;
  if (!id) throw new Error("No active session");

  // Email get from auth.users (through session)
  const email = authData.user?.email ?? "";

  const { data, error } = await supabase
    .from("user")
    .select("id, username, realname, image_url")
    .eq("id", id)
    .single();

  if (error) throw error;

  return {
    id,
    email,
    username: data?.username ?? null,
    realname: data?.realname ?? null,
    image_url: data?.image_url ?? null,
  };
}

export async function uploadAvatar(
  uid: string,
  fileUri: string,
): Promise<string> {
  const res = await fetch(fileUri);
  const blob = await res.blob();

  const extGuess = (fileUri.split(".").pop() || "jpg").split("?")[0];
  const fileExt = extGuess.toLowerCase();
  const filePath = `${uid}/${Date.now()}.${fileExt}`;

  const { error: upErr } = await supabase.storage
    .from("avatars")
    .upload(filePath, blob, {
      upsert: true,
      contentType: blob.type || `image/${fileExt}`,
    });

  if (upErr) throw upErr;

  // Get public URL
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  return data.publicUrl;
}

/**
 * Change the password for the currently logged-in user.
 */
export async function changePassword(newPassword: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}