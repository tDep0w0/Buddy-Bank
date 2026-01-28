import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

type Props = { onPress: () => void };

export const ScanReceiptButton: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.9 : 1 }]}>
      <Ionicons name="scan-outline" size={20} color="#0B0E0C" />
      <Text style={styles.text}>Scan Receipt</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    color: '#0B0E0C',
    fontWeight: '700',
    fontSize: 16,
  },
});
