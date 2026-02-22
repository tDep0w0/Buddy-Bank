import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

type Props = { label: string; onPress: () => void };

export default function FooterPrimaryButton({ label, onPress }: Props) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onPress} style={styles.btn} activeOpacity={0.9}>
        <Text style={styles.icon}>✓</Text>
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 12,
    backgroundColor: Colors.background,
  },
  btn: {
    backgroundColor: Colors.primary,
    height: 52, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: { color: '#083b1f', fontWeight: '900', marginRight: 8, fontSize: 16 },
  label: { color: '#083b1f', fontWeight: '800', fontSize: 16 },
});