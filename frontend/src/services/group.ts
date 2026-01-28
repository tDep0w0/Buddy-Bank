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

export async function getGroupInfo(groupId: string, userId: string) {
  const userExpensePromise = supabase
    .from("user_group")
    .select("expense")
    .eq("group_id", groupId)
    .eq("user_id", userId);

  const totalExpensePromise = supabase
    .from("user_group")
    .select("expense")
    .eq("group_id", groupId);

  const expensePromise = supabase
    .from("expense")
    .select(
      `
        id,
        created_at,
        description,
        amount,
        category,
        payer:user (
          id,
          username
        )
      `,
    )
    .eq("group_id", groupId)
    .order("created_at", { ascending: false });

  const [userExpenseResult, totalExpenseResult, expenseResult] =
    await Promise.all([
      userExpensePromise,
      totalExpensePromise,
      expensePromise,
    ]);

  if (userExpenseResult.error) throw userExpenseResult.error;
  if (totalExpenseResult.error) throw totalExpenseResult.error;
  if (expenseResult.error) throw expenseResult.error;

  const userExpense = userExpenseResult.data[0]?.expense || 0;
  const totalExpense = totalExpenseResult.data.reduce(
    (sum, row) => sum + (row.expense || 0),
    0,
  );
  const expenses = expenseResult.data;

  return {
    userExpense,
    totalExpense,
    expenses,
  };
}

export async function postGroup(
  userId: string,
  name: string,
  imageUrl: string,
  memberIds: string[],
) {
  const { data, error } = await supabase.rpc("create_group", {
    p_creator_id: userId,
    p_name: name,
    p_image_url: imageUrl,
    p_member_ids: memberIds,
  });

  if (error) throw error;

  return data;
}

export async function updateGroup(
  userId: string,
  groupId: string,
  name: string,
  imageUrl: string,
  memberIds: string[],
) {
  const { error } = await supabase.rpc("update_group", {
    p_user_id: userId,
    p_group_id: groupId,
    p_name: name,
    p_image_url: imageUrl,
    p_member_ids: memberIds,
  });

  if (error) throw error;
}

export async function deleteGroup(userId: string, groupId: string) {
  // Check if user is in the group
  const { data, error: checkError } = await supabase
    .from("user_group")
    .select("*")
    .eq("user_id", userId)
    .eq("group_id", groupId);

  if (checkError) throw checkError;

  if (!data || data.length === 0) throw new Error("User is not in the group");

  // Delete the group
  const { error: deleteError } = await supabase
    .from("group")
    .delete()
    .eq("id", groupId);

  if (deleteError) throw deleteError;
}
