import { supabase } from "./supabase";

export type AuthResult =
  | { ok: true }
  | { ok: false; code?: string; message: string };

export async function signInWithEmailPassword(
  email: string,
  password: string,
): Promise<AuthResult> {
  if (!email || !password) {
    return { ok: false, message: "Email and Password cannot be left blank." };
  }
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, code: error.code, message: error.message };
  }
  return { ok: true };
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

/**
 * Google OAuth
 * - Web: mở popup OAuth chuẩn
 * - Native: dùng deep link/redirect về app scheme của bạn
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  // Với Expo, Supabase SDK hỗ trợ trực tiếp cho Web.
  // Trên native, vẫn dùng signInWithOAuth + redirectTo (đi kèm app scheme)
  // (xem phần cấu hình redirect bên dưới)
  const redirectTo =
    Platform.OS === "web"
      ? undefined
      : "exp://localhost:19000/--/auth/callback"; // thay bằng scheme của bạn

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });

  if (error) {
    return { ok: false, code: error.code, message: error.message };
  }
  // Trên web sẽ mở popup; trên native sẽ chuyển sang trình duyệt
  return { ok: true };
}
