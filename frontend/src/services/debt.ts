import { supabase } from "./supabase";

export async function getDebts(groupId: string, userId: string) {
  const { data, error } = await supabase
    .from("debt")
    .select(
      `
        lender:user!debts_lender_id_fkey (
          id,
          username,
          image_url
        ),
        borrower:user!debts_borrower_id_fkey (
          id,
          username,
          image_url
        ),
        amount
      `,
    )
    .eq("group_id", groupId)
    .or(`lender_id.eq.${userId},borrower_id.eq.${userId}`)
    .eq("is_paid", false);

  if (error) throw error;

  return data;
}
