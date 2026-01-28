import { Split } from "@/types/expense";
import { supabase } from "./supabase";

export async function getExpenseDetail(expenseId: string, userId: string) {
  const expensePromise = supabase
    .from("expense")
    .select(
      `
        id,
        created_at,
        description,
        amount,
        receipt_image_url,
        category,
        payer:user (
          id,
          username
        )
      `,
    )
    .eq("id", expenseId);

  const splitsPromise = supabase
    .from("expense_split")
    .select(
      `
        id,
        amount,
        receipt_item_id,
        user (
          id,
          username,
          image_url
        )
      `,
    )
    .eq("expense_id", expenseId);

  const itemsPromise = await supabase
    .from("receipt_item")
    .select(
      `
        id,
        name,
        price
      `,
    )
    .eq("expense_id", expenseId);

  const [expenseResult, splitsResult, itemsResult] = await Promise.all([
    expensePromise,
    splitsPromise,
    itemsPromise,
  ]);

  if (expenseResult.error) throw expenseResult.error;
  if (splitsResult.error) throw splitsResult.error;
  if (itemsResult.error) throw itemsResult.error;

  const generalData = expenseResult.data[0];
  const itemList = itemsResult.data;
  const splits = splitsResult.data;

  splits.forEach((split) => {
    split.user.username =
      split.user.id === userId ? "You" : split.user.username;
  });

  const response = {
    ...generalData,
    items: itemList.map((item) => ({
      ...item,
      isShared: true,
      avatar_url_list: [] as (string | null)[],
      splits: [] as Split[],
    })),
    splits: [] as Split[],
  };

  for (const split of splits) {
    const { receipt_item_id, ...rest } = split;

    if (receipt_item_id === null) {
      response.splits.push(rest);
      continue;
    }

    for (const item of response.items)
      if (item.id === receipt_item_id) item.splits.push(rest);
  }

  const groupMembers = response.splits.length;

  for (const item of response.items) {
    item.isShared = item.splits.every(
      (split) => Math.abs(split.amount - item.price / groupMembers) <= 0.1,
    );
    item.avatar_url_list = item.splits.map((split) => split.user.image_url);
  }

  if (response.payer.id === userId) response.payer.username = "you";

  return response;
}
