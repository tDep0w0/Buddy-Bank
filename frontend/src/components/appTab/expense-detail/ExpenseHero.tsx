import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

export default function ExpenseHero({
  title, payer, dateStr, amount,
}: { title: string; payer: string; dateStr: string; amount: number }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name="cart" size={28} color={Colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub}>
        Paid by <Text style={{ color: '#fff' }}>{payer}</Text>  ·  {dateStr}
      </Text>
      <Text style={styles.amount}>${amount.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface, borderRadius: 16,
    padding: 16, borderWidth: 1, borderColor: Colors.border, alignItems: 'center',
    marginBottom: 14,
  },
  iconWrap: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: '#0f221a',
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  title: { color: '#fff', fontSize: 20, fontWeight: '700', marginTop: 2 },
  sub: { color: Colors.textGray, marginTop: 6 },
  amount: { color: Colors.primary, fontSize: 28, fontWeight: '800', marginTop: 8 },
});