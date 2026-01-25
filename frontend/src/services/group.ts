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
        expense_category (
          image_url
        ),
        user (
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
  const expenses = expenseResult.data.map(
    ({ expense_category, user, ...rest }) => ({
      ...rest,
      image_url: expense_category?.image_url ?? null,
      payer: user.username,
    }),
  );

  return {
    userExpense,
    totalExpense,
    expenses,
  };
}
