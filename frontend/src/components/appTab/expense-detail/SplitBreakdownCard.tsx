import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/colors';

export type SplitRow = { id: string; name: string; amount: number; isPayer?: boolean };

export default function SplitBreakdownCard({ rows }: { rows: SplitRow[] }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Split Breakdown</Text>

      {rows.map((r, idx) => (
        <View key={r.id} style={[styles.row, idx !== rows.length - 1 && { marginBottom: 10 }]}>
          <Image source={require('../../../../assets/images/default_ava.jpg')} style={styles.ava} />
          <Text style={styles.name}>{r.name}</Text>

          {r.isPayer && <Text style={styles.paidPill}>PAID</Text>}

          <Text style={styles.amount}>${r.amount.toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface, borderRadius: 16, padding: 14,
    borderWidth: 1, borderColor: Colors.border,
  },
  title: { color: '#fff', fontWeight: '700', marginBottom: 8 },
  row: {
    backgroundColor: '#11231b', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 12,
    borderWidth: 1, borderColor: Colors.border, flexDirection: 'row', alignItems: 'center',
  },
  ava: { width: 24, height: 24, borderRadius: 12, marginRight: 10 },
  name: { color: '#fff', fontWeight: '600', flex: 1 },
  paidPill: {
    backgroundColor: '#1e2f26', color: '#9edfb9', fontWeight: '700', fontSize: 12,
    paddingVertical: 2, paddingHorizontal: 8, borderRadius: 8, marginRight: 8,
  },
  amount: { color: '#fff', fontWeight: '700' },
});