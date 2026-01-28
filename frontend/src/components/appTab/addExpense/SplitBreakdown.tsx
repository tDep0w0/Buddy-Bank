import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Avatar } from '../common/Avatar';

export type Participant = {
  id: string;
  name: string;
  avatar?: string;
  included: boolean;
  amount: number;
};

type SplitRowProps = {
  item: Participant;
  onToggle: (id: string) => void;
  onChangeAmount: (id: string, amount: number) => void;
};

const SplitRow: React.FC<SplitRowProps> = ({ item, onToggle, onChangeAmount }) => {
  const rowBg = Colors.surface;
  const rowBorder = Colors.border;
  const pillBg = 'rgba(255,255,255,0.05)';

  const [text, setText] = useState(item.amount.toString());

  return (
    <View style={[styles.row, { backgroundColor: rowBg, borderColor: rowBorder }]}>
      <Pressable onPress={() => onToggle(item.id)} style={styles.radioWrap}>
        <Ionicons
          name={item.included ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color={item.included ? Colors.primary : Colors.textGray}
        />
      </Pressable>

      <Avatar name={item.name} uri={item.avatar} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
      </View>

      <View style={[styles.amountBox, { backgroundColor: pillBg, borderColor: rowBorder }]}>
        <Text style={styles.currency}>$</Text>
        <TextInput
          value={text}
          placeholder='0.00'
          onChangeText={(t) => {
            const normalized = t.replace(',', '.');
            setText(normalized);
            const n = Number(normalized);
            onChangeAmount(item.id, Number.isNaN(n) ? 0.00 : n);
          }}
          onBlur={() => {
            const n = Number(text.replace(',', '.'));
            if (!Number.isNaN(n)) {
              setText(n.toFixed(2));
              onChangeAmount(item.id, n);
            } else {
              setText('');
              onChangeAmount(item.id, 0.00);
            }
          }}
          keyboardType="decimal-pad"
          style={styles.amountInput}
        />
      </View>
    </View>
  );
};

type Props = {
  participants: Participant[];
  onToggle: (id: string) => void;
  onChangeAmount: (id: string, amount: number) => void;
};

export const SplitBreakdown: React.FC<Props> = ({ participants, onToggle, onChangeAmount }) => {
  return (
    <View style={{ gap: 12 }}>
      <Text style={styles.title}>Split Breakdown</Text>
      {participants.map((p) => (
        <SplitRow key={p.id} item={p} onToggle={onToggle} onChangeAmount={onChangeAmount} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  radioWrap: { 
    padding: 4 
  },
  name: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  currency: {
    color: Colors.textGray,
    marginRight: 6,
    fontWeight: '700',
  },
  amountInput: {
    minWidth: 70,
    color: 'white',
    fontWeight: '700',
    textAlign: 'right',
  },
});
