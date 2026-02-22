import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Colors } from '@/constants/colors';

export type SplitChip = { id: string; name: string; amount: number; isMe?: boolean };

export default function SplitChips({ chips }: { chips: SplitChip[] }) {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 8 }}>
        {chips.map((c) => (
          <View key={c.id} style={[styles.chip, c.isMe && styles.meChip]}>
            <View style={styles.left}>
              {/* Default Avatar */}
              <Image source={require('../../../../assets/images/default_ava.jpg')} style={styles.ava} />
              <Text style={[styles.name, c.isMe && styles.meName]} numberOfLines={1}>
                {c.isMe ? 'ME' : c.name}
              </Text>
            </View>
            <Text style={styles.amount}>${c.amount.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1, borderColor: Colors.border,
    flexDirection: 'row', alignItems: 'center',
  },
  meChip: {
    backgroundColor: '#143b2b'
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 120
  },
  ava: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginRight: 8
  },
  name: {
    color: '#fff',
    fontWeight: '600'
  },
  meName: {
    color: '#b5ffd2'
  },
  amount: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 12
  },
});