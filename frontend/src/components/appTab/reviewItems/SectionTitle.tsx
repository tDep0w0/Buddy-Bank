import React, { PropsWithChildren } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

export default function SectionTitle({ children }: PropsWithChildren) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 8 },
  text: { color: Colors.textGray, fontSize: 12, letterSpacing: 0.4 },
});
