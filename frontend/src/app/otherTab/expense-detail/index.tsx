import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/colors';

import ExpenseHero from '@/components/appTab/expense-detail/ExpenseHero';
import ItemsCard, { DetailItem } from '@/components/appTab/expense-detail/ItemCard';
import SplitBreakdownCard, { SplitRow } from '@/components/appTab/expense-detail/SplitBreakdownCard';
import ItemDetailSheet from '@/components/appTab/expense-detail/ItemDetailSheet';

export default function ExpenseDetailScreen() {
  const params = useLocalSearchParams<{ name?: string; amount?: string; time?: string; payer?: string }>();
  const title = params.name ?? 'Groceries for Trip';
  const total = Number(params.amount ?? 124.5);
  const payer = params.payer ?? 'Alice';
  const dateStr = 'Oct 24, 2023'; // UI-only; TODO backend: get from expense payload

  // Dummy items (UI-only)
  const items: DetailItem[] = [
    { id: 'i1', name: 'Milk & Dairy', price: 14.5, sharedWith: ['alice', 'bob'] },
    { id: 'i2', name: 'Craft Beer Pack', price: 20.0, sharedWith: ['alice', 'bob', 'dave'] },
    { id: 'i3', name: 'General Groceries', price: 90.0, sharedWith: ['alice', 'bob', 'dave'], sharedTag: 'SHARED' },
  ];

  // Dummy split breakdown (UI-only)
  const splitRows: SplitRow[] = [
    { id: 'alice', name: 'Alice', amount: 62.25, isPayer: true },
    { id: 'bob', name: 'Bob', amount: 31.12 },
    { id: 'dave', name: 'Dave', amount: 31.13 },
  ];

  const [sheetItem, setSheetItem] = useState<DetailItem | null>(null);

  return (
    <View style={styles.screen}>
      <View style={{ height: 20 }}></View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ExpenseHero title={title} payer={payer} dateStr={dateStr} amount={total} />

        <ItemsCard items={items} onPressItem={(it) => setSheetItem(it)} />

        <SplitBreakdownCard rows={splitRows} />
      </ScrollView>

      <ItemDetailSheet
        visible={!!sheetItem}
        item={sheetItem || undefined}
        onClose={() => setSheetItem(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
});