import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

type Props = { onPress: () => void };

export const ScanReceiptButton: React.FC<Props> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.9 : 1 }]}>
      <Ionicons name="scan-outline" size={20} color={Colors.background}/>
      <Text style={styles.text}>Scan Receipt</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 120,
    borderRadius: 12,
  },
  text: {
    color: Colors.background,
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 4,
  },
});
