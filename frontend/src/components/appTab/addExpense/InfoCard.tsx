import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Avatar } from '../common/Avatar';

export const RowTwoCols: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.row}>{children}</View>
);

export const DateCard: React.FC<{
  date: Date;
  onPress: () => void;
}> = ({ date, onPress }) => {
  // UI-only: format đơn giản
  const display = date.toLocaleString();
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardLabel}>DATE</Text>
        <Ionicons name="calendar-outline" size={18} color="#E6EFE9" />
      </View>
      <Text style={styles.cardValue}>{display}</Text>
    </Pressable>
  );
};

export const PaidByCard: React.FC<{
  name: string;
  onPress: () => void;
}> = ({ name, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardLabel}>PAID BY</Text>
        <Ionicons name="chevron-down" size={18} color="#E6EFE9" />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Avatar name={name} />
        <Text style={styles.cardValue}>{name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12 },
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardLabel: {
    color: Colors.textGray,
    fontSize: 12,
    letterSpacing: 1.2,
  },
  cardValue: {
    color: '#E6EFE9',
    fontSize: 16,
    fontWeight: '600',
  },
});
