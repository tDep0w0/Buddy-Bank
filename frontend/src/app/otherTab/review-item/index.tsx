import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/colors';

import TotalBillCard from '@/components/appTab/reviewItems/TotalBillCard';
import ViewReceiptButton from '@/components/appTab/reviewItems/ViewReceiptButton';
import SectionTitle from '@/components/appTab/reviewItems/SectionTitle';
import SplitChips, { SplitChip } from '@/components/appTab/reviewItems/SplitChips';
import ItemsList from '@/components/appTab/reviewItems/ItemsList';
import FooterPrimaryButton from '@/components/appTab/reviewItems/FooterPrimaryButton';

export type Member = { id: string; name: string };
export type Item = { id: string; name: string; price: number; sharedWith: string[] };

// Dummy members (UI only)
const members: Member[] = [
  { id: 'you', name: 'You' },
  { id: 'sarah', name: 'Sarah' },
  { id: 'mike', name: 'Mike' },
  { id: 'alex', name: 'Alex' },
];

// Dummy items (UI only)
const initialItems: Item[] = [
  { id: 'i1', name: 'Milk 1 Gallon', price: 3.99, sharedWith: ['you'] },
  { id: 'i2', name: 'Eggs 1 Dozen', price: 5.50, sharedWith: ['you', 'sarah', 'mike', 'alex'] },
  { id: 'i3', name: 'Avocados (3)', price: 4.50, sharedWith: ['mike'] },
  { id: 'i4', name: 'Shared Drinks', price: 29.49, sharedWith: ['you', 'sarah', 'mike'] },
];

export default function ReviewItemsScreen() {
  const { amount } = useLocalSearchParams<{ amount?: string }>();
  const totalBill = Number(amount) > 0 ? Number(amount) : 45.2;

  const items = initialItems;

  const chips: SplitChip[] = useMemo(() => {
    // Calculate each person's share based on how much they share of each item.
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
      isMe: m.id === 'you',
    }));
  }, []);

  const sumItems = items.reduce((s, it) => s + it.price, 0);
  const inconsistent = Math.abs(sumItems - totalBill) > 0.01;

  return (
    <View style={styles.screen}>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topCard}>
          <TotalBillCard total={totalBill} />
          <ViewReceiptButton imagePath="../../../assets/images/dummy_bill.jpg" />

          {inconsistent && (
            <View style={styles.warning}>
              <Text style={styles.warnText}>
                The sum of items (${sumItems.toFixed(2)}) does not match the total. Do not forget to add tax or tip.
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
          // TODO backend: Confirm split money
          console.log('Confirm & Split (UI)', {
            totalBill,
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
    backgroundColor: '#2a2f23',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 10,
  },
  warnText: { color: '#ffd27d' },
});