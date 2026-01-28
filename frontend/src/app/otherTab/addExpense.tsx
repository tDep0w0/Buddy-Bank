import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { AmountHeader } from '@/components/appTab/addExpense/AmountHeader';
import { ScanReceiptButton } from '@/components/appTab/addExpense/ScanReceiptButton';
import { DescriptionField } from '@/components/appTab/addExpense/DescriptionField';
import { RowTwoCols, DateCard, PaidByCard } from '@/components/appTab/addExpense/InfoCard';
import { SplitBreakdown, Participant } from '@/components/appTab/addExpense/SplitBreakdown';
import AddExpensesButton from '@/components/appTab/AddExpenses';
import { router } from "expo-router";

const initialMembers: Participant[] = [
  { id: 'you', name: 'You', avatar: undefined, included: true, amount: 0 },
  { id: 'alice', name: 'Alice', avatar: undefined, included: true, amount: 0 },
  { id: 'bob', name: 'Bob', avatar: undefined, included: true, amount: 0 },
];

export default function AddExpensesScreen() {
  const [amount, setAmount] = useState<number>(0);
  const [desc, setDesc] = useState('');
  const [date] = useState(new Date());
  const [paidBy] = useState<string>('you');
  const [members, setMembers] = useState<Participant[]>(initialMembers);

  const paidByName = members.find((m) => m.id === paidBy)?.name ?? 'You';

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <AmountHeader amount={amount} onAmountChange={setAmount} />

        <View style={{ height: 16 }} />
        <ScanReceiptButton onPress={() => { console.log("Scan Receipt Button Pressed") }} />

        <View style={{ height: 20 }} />
        <DescriptionField value={desc} onChange={setDesc} onNotesPress={() => { console.log("On Notes Pressed") }} />

        <View style={{ height: 16 }} />
        <RowTwoCols>
          <DateCard date={date} onPress={() => { console.log("Open Date Card Modal") }} />
          <PaidByCard name={paidByName} onPress={() => { console.log("Open Payer Dropbox") }} />
        </RowTwoCols>

        <View style={{ height: 20 }} />
        <SplitBreakdown
          participants={members}
          onToggle={(id) => {
            setMembers((prev) => prev.map(m => m.id === id ? ({ ...m, included: !m.included }) : m));
          }}
          onChangeAmount={(id, v) => {
            setMembers((prev) => prev.map(m => m.id === id ? ({ ...m, amount: v }) : m));
          }}
        />

        <View style={{ height: 32 }} />

      </ScrollView>


      <AddExpensesButton onPress={() => {
        console.log('Add Expenses button Pressed');
        router.back();
      }} />
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