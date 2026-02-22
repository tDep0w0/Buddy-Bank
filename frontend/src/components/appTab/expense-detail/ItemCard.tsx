import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/colors';
import { router } from 'expo-router';

export type DetailItem = {
  id: string;
  name: string;
  price: number;
  sharedWith: string[];  // ids
  sharedTag?: 'SHARED';
};

export default function ItemsCard({
  items, onPressItem,
}: {
  items: DetailItem[];
  onPressItem: (item: DetailItem) => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.title}>Items</Text>
        <Text style={styles.count}>{items.length} ITEMS</Text>
      </View>

      {items.map((it, idx) => (
        <TouchableOpacity
          key={it.id}
          style={[styles.row, idx !== items.length - 1 && { marginBottom: 10 }]}
          onPress={() => onPressItem(it)}
          activeOpacity={0.85}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.rowName}>{it.name}</Text>
            {it.sharedTag && <Text style={styles.sharedTag}>{it.sharedTag}</Text>}
          </View>

          {/* Avatars demo */}
          <View style={styles.avas}>
            {it.sharedWith.slice(0, 3).map((uid) => (
              <Image
                key={uid}
                source={require('../../../../assets/images/default_ava.jpg')}
                style={styles.ava}
              />
            ))}
          </View>

          <Text style={styles.price}>${it.price.toFixed(2)}</Text>
          <Text style={styles.chev}>{'›'}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => {
          console.log('View Original Receipt (UI)');
          router.push('/otherTab/expense-detail/view-receipt');
        }}
        style={styles.viewReceipt}
      >
        <Text style={styles.receiptIcon}>🧾</Text>
        <Text style={styles.viewText}>View Original Receipt</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface, borderRadius: 16, padding: 14,
    borderWidth: 1, borderColor: Colors.border, marginBottom: 14,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  title: { color: '#fff', fontWeight: '700' },
  count: { color: Colors.textGray, fontSize: 12 },
  row: {
    backgroundColor: '#11231b', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 12,
    borderWidth: 1, borderColor: Colors.border, flexDirection: 'row', alignItems: 'center',
  },
  rowName: { color: '#fff', fontSize: 16, fontWeight: '600' },
  sharedTag: {
    alignSelf: 'flex-start', marginTop: 6, paddingVertical: 2, paddingHorizontal: 8,
    borderRadius: 8, backgroundColor: '#1e2f26', color: '#9edfb9', fontWeight: '700', fontSize: 12,
  },
  avas: { flexDirection: 'row', marginHorizontal: 10 },
  ava: { width: 18, height: 18, borderRadius: 9, marginRight: 4 },
  price: { color: '#fff', fontWeight: '700' },
  chev: { color: Colors.textGray, fontSize: 26, marginLeft: 6, marginTop: -4 },
  viewReceipt: {
    marginTop: 12, alignSelf: 'flex-start',
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 10, paddingHorizontal: 12,
  },
  receiptIcon: { fontSize: 16, color: '#fff' },
  viewText: { color: '#8cf7b7', fontWeight: '700', marginLeft: 8 },
});