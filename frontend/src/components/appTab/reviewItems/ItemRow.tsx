import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/colors';
import { router } from 'expo-router';
import type { Item, Member } from '../../../app/otherTab/review-item/types';

type Props = {
  item: Item;
  members: Member[];
};

export default function ItemRow({ item, members }: Props) {
  const sharedAvas = item.sharedWith.slice(0, 3).map((id) => (
    <Image
      key={id}
      source={require('../../../../assets/images/default_ava.jpg')}
      style={styles.ava}
    />
  ));
  const moreCount = Math.max(0, item.sharedWith.length - 3);

  return (
    <TouchableOpacity
      onPress={() => {
        // TODO backend: Open edit-item screen
        console.log('Open Edit Item (UI)', item);
        router.push({
          pathname: '/otherTab/review-item/edit-item',
          params: { item: JSON.stringify(item) },
        });
      }}
      style={styles.row}
      activeOpacity={0.8}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <View style={styles.sharedWrap}>
          {sharedAvas}
          {moreCount > 0 && <Text style={styles.more}>+{moreCount}</Text>}
        </View>
      </View>

      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <Text style={styles.chev}>{'›'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border,
    marginBottom: 10,
  },
  name: { color: '#fff', fontSize: 16, fontWeight: '600' },
  sharedWrap: { flexDirection: 'row', marginTop: 6, alignItems: 'center' },
  ava: { width: 18, height: 18, borderRadius: 9, marginRight: 6 },
  more: { color: Colors.textGray, fontSize: 12 },
  price: { color: '#fff', fontWeight: '700', marginLeft: 8 },
  chev: { color: Colors.textGray, fontSize: 26, marginLeft: 6, marginTop: -4 },
});