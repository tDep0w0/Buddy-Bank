import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";

import { Colors } from "@/constants/colors";
import { AmountHeader } from "@/components/appTab/addExpense/AmountHeader";
import ScanReceiptButton from "@/components/appTab/addExpense/ScanReceiptButton";
import { DescriptionField } from "@/components/appTab/addExpense/DescriptionField";
import {
  RowTwoCols,
  DateCard,
  PaidByCard,
} from "@/components/appTab/addExpense/InfoCard";
import {
  SplitBreakdown,
  Participant,
} from "@/components/appTab/addExpense/SplitBreakdown";
import AddExpensesButton from "@/components/appTab/AddExpenses";

import SelectCategoriesModal from "@/components/appTab/addExpense/SelectCategoriesModal";
import { DEFAULT_CATEGORIES } from "@/constants/categories";
import { scanReceipt } from "@/services/receipt";
import { reviewStore } from "@/services/reviewStore";

// ---- Dummy data for UI ----
const initialMembers: Participant[] = [
  { id: "you", name: "You", avatar: undefined, included: true, amount: 0 },
  { id: "alice", name: "Alice", avatar: undefined, included: true, amount: 0 },
  { id: "bob", name: "Bob", avatar: undefined, included: true, amount: 0 },
];

// Use for PaidByCard (UI-only)
type Person = { id: string; name: string; avatar?: string };
const people: Person[] = [
  { id: "you", name: "You" },
  { id: "alice", name: "Alice" },
  { id: "bob", name: "Bob" },
];

export default function AddExpensesScreen() {
  // State only use for UI, not included backend/ logic
  const [amount, setAmount] = useState<number>(0);
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(new Date()); // <- feed for DateCard
  const [paidById, setPaidById] = useState<string>("you"); // <- feed for PaidByCard
  const [members, setMembers] = useState<Participant[]>(initialMembers);

  const [categoryId, setCategoryId] = useState<string>("general");
  const [categoryModal, setCategoryModal] = useState(false);

  // Receipt scanning state
  const [receiptUrl, setReceiptUrl] = useState<string | undefined>(undefined);
  const [scanning, setScanning] = useState(false);

  // Handle receipt image picked from camera/gallery
  const handleReceiptPicked = async (localUri: string) => {
    setReceiptUrl(localUri); // show button as "picked"
    setScanning(true);
    try {
      const { imageUrl, items } = await scanReceipt(localUri);
      setReceiptUrl(imageUrl); // update to remote URL

      // Auto-fill total from receipt items
      const total = items.reduce((sum, it) => sum + it.price, 0);
      if (total > 0 && amount === 0) setAmount(total);

      // Build review-item data: each AI item is shared by all included members
      const includedMembers = members.filter((m) => m.included);
      const reviewItems = items.map((it, i) => ({
        id: `ai_${i}_${Date.now()}`,
        name: it.item,
        price: it.price,
        sharedWith: includedMembers.map((m) => m.id),
      }));
      const reviewMembers = members.map((m) => ({ id: m.id, name: m.name }));

      // Populate shared store so review-item screens can read it
      reviewStore.init({
        items: reviewItems,
        members: reviewMembers,
        receiptImageUrl: imageUrl,
        totalBill: amount > 0 ? amount : total,
      });
    } catch (err: any) {
      Alert.alert("Scan Failed", err.message || "Could not analyze receipt");
      setReceiptUrl(undefined);
    } finally {
      setScanning(false);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AmountHeader amount={amount} onAmountChange={setAmount} />

        <View style={{ height: 12 }} />
        <ScanReceiptButton
          receiptUrl={receiptUrl}
          onChangeReceipt={handleReceiptPicked}
          loading={scanning}
          amount={amount}
          desc={desc}
          date={date}
          paidById={paidById}
        />

        <View style={{ height: 22 }} />
        <DescriptionField
          value={desc}
          onChange={setDesc}
          onNotesPress={() => {
            setCategoryModal(true);
          }}
        />

        <SelectCategoriesModal
          visible={categoryModal}
          categories={DEFAULT_CATEGORIES}
          selectedId={categoryId}
          onSelect={(id) => {
            setCategoryId(id); // TODO backend: gắn category cho expense
            const chosen = DEFAULT_CATEGORIES.find((c) => c.id === id);
            console.log("Selected category (UI)", chosen);
          }}
          onClose={() => setCategoryModal(false)}
        />

        <View style={{ height: 10 }} />
        <RowTwoCols>
          {/* DateCard has a calendar modal inside; it returns an `onChange` event so you can save the UI state.*/}
          <DateCard
            date={date}
            onChange={(d) => {
              setDate(d);
              // Backend later: sync selected datetime
              console.log("Selected date/time (UI)", d.toISOString());
            }}
          />
          {/* PaidByCard open dropdown; need people + selectedId */}
          <PaidByCard
            selectedId={paidById}
            people={people}
            onChange={(id) => {
              setPaidById(id);
              // Backend later: store payer.
              const chosen = people.find((p) => p.id === id);
              console.log("Selected payer (UI)", { id, name: chosen?.name });
            }}
          />
        </RowTwoCols>

        <View style={{ height: 24 }} />
        <SplitBreakdown
          participants={members}
          onToggle={(id) => {
            // UI-only: simply flip the state to see the effect.
            setMembers((prev) =>
              prev.map((m) =>
                m.id === id ? { ...m, included: !m.included } : m,
              ),
            );
            console.log("TODO backend: toggle participant include", { id });
          }}
          onChangeAmount={(id, v) => {
            // UI-only: change the number in the input field.
            setMembers((prev) =>
              prev.map((m) => (m.id === id ? { ...m, amount: v } : m)),
            );
            console.log("TODO backend: change participant amount", {
              id,
              amount: v,
            });
          }}
        />

        <View style={{ height: 32 }} />
      </ScrollView>

      <AddExpensesButton
        onPress={() => {
          // Backend later: submit payload
          console.log("TODO backend: submit expense", {
            amount,
            desc,
            date: date.toISOString(),
            paidById,
            members,
            receiptUrl, // có thể gửi kèm receiptUrl
            categoryId,
          });

          router.back();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 36,
  },
});
