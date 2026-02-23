import React, { useMemo } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/colors";

import TotalBillCard from "@/components/appTab/reviewItems/TotalBillCard";
import ViewReceiptButton from "@/components/appTab/reviewItems/ViewReceiptButton";
import SectionTitle from "@/components/appTab/reviewItems/SectionTitle";
import SplitChips, {
  SplitChip,
} from "@/components/appTab/reviewItems/SplitChips";
import ItemsList from "@/components/appTab/reviewItems/ItemsList";
import FooterPrimaryButton from "@/components/appTab/reviewItems/FooterPrimaryButton";
import { useReviewStore } from "@/services/reviewStore";

export type Member = { id: string; name: string };
export type Item = {
  id: string;
  name: string;
  price: number;
  sharedWith: string[];
};

export default function ReviewItemsScreen() {
  const { amount } = useLocalSearchParams<{ amount?: string }>();
  const { items, members, receiptImageUrl, totalBill } = useReviewStore();

  // Use amount from params if available, then store totalBill, then sum of items
  const sumItems = items.reduce((s, it) => s + it.price, 0);
  const effectiveTotalBill =
    Number(amount) > 0 ? Number(amount) : totalBill > 0 ? totalBill : sumItems;

  const chips: SplitChip[] = useMemo(() => {
    const map: Record<string, number> = {};
    members.forEach((m) => (map[m.id] = 0));

    items.forEach((it) => {
      const split = it.price / (it.sharedWith.length || 1);
      it.sharedWith.forEach((pid) => {
        map[pid] = (map[pid] || 0) + split;
      });
    });

    return members.map((m) => ({
      id: m.id,
      name: m.name,
      amount: map[m.id] || 0,
      isMe: m.id === "you",
    }));
  }, [items, members]);

  const inconsistent =
    effectiveTotalBill > 0 && Math.abs(sumItems - effectiveTotalBill) > 0.01;

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topCard}>
          <TotalBillCard total={effectiveTotalBill} />
          <ViewReceiptButton receiptImageUrl={receiptImageUrl} />

          {inconsistent && (
            <View style={styles.warning}>
              <Text style={styles.warnText}>
                The sum of items (${sumItems.toFixed(2)}) does not match the
                total. Do not forget to add tax or tip.
              </Text>
            </View>
          )}
        </View>

        <SectionTitle>SPLIT BREAKDOWN</SectionTitle>
        <SplitChips chips={chips} />

        <View style={{ height: 18 }} />
        <ItemsList items={items} members={members} />
      </ScrollView>

      <FooterPrimaryButton
        label="Confirm & Split"
        onPress={() => {
          console.log("Confirm & Split", {
            totalBill: effectiveTotalBill,
            items,
            split: chips.map((c) => ({ id: c.id, amount: c.amount })),
          });
          router.back();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 16, paddingBottom: 28 },
  topCard: { marginBottom: 16 },
  warning: {
    marginTop: 12,
    backgroundColor: "#2a2f23",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 10,
  },
  warnText: { color: "#ffd27d" },
});
