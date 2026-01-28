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
  const display = date.toLocaleString(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });
  return (
    <Pressable onPress={onPress} style={styles.card} >
      <View style={styles.cardHeader}>
        <Text style={styles.cardLabel}>DATE</Text>
        <Ionicons name="calendar-outline" size={20} color='white' />
      </View>
      <Text style={styles.cardValue}>{display}</Text>
    </Pressable >
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
        <Ionicons name="chevron-down" size={20} color='white' />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Avatar name={name} />
        <Text style={styles.cardValue}>{name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12
  },
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardLabel: {
    color: Colors.textGray,
    fontSize: 14,
    letterSpacing: 1.2,
  },
  cardValue: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});
