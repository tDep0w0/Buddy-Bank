import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

type Props = { total: number };

export default function TotalBillCard({ total }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>TOTAL BILL</Text>
      <Text style={styles.amount}>${total.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1, borderColor: Colors.border,
  },
  label: { color: Colors.textGray, fontSize: 12, marginBottom: 6 },
  amount: { color: '#fff', fontSize: 28, fontWeight: '700' },
});
