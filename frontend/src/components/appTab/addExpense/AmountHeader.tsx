import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '@/constants/colors';

type Props = {
  amount: number;
  onAmountChange: (v: number) => void;
};

export const AmountHeader: React.FC<Props> = ({ amount, onAmountChange }) => {
  const [text, setText] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>TOTAL BILL</Text>
      <View style={styles.row}>
        <Text style={styles.currency}>$</Text>
        <TextInput
          value={text}
          onChangeText={(t) => {
            const normalized = t.replace(',', '.'); 
            setText(normalized);
            const n = Number(normalized);
            onAmountChange(Number.isNaN(n) ? 0 : n);
          }}
          onBlur={() => {
            const n = Number(text.replace(',', '.')); 
            if (!Number.isNaN(n)) {
              setText(n.toFixed(2));
            } else {
              setText('');
            }
          }}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={Colors.textGray}
          style={styles.input}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 16,
  },
  label: {
    color: Colors.textGray,
    letterSpacing: 1.4,
    marginBottom: 4,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currency: {
    fontSize: 56,
    fontWeight: '600',
    color: Colors.textGray,
  },
  input: {
    fontSize: 56,
    fontWeight: '800',
    minWidth: 140,
    color: 'white',
    textAlign: 'center',
  },
});
