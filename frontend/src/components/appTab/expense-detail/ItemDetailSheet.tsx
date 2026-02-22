import React from 'react';
import { Modal, View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/colors';
import type { DetailItem } from './ItemCard';

export default function ItemDetailSheet({
  visible, item, onClose,
}: { visible: boolean; item?: DetailItem; onClose: () => void }) {
  if (!item) return null;

  const perPerson = item.sharedWith.length ? item.price / item.sharedWith.length : item.price;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay} onTouchEnd={onClose}>
        <View style={styles.sheet} onTouchEnd={(e) => e.stopPropagation()}>
          <View style={styles.grabber} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.amount}>${item.price.toFixed(2)}</Text>
          <Text style={styles.sharedPill}>SHARED</Text>

          <View style={{ height: 12 }} />
          {item.sharedWith.map((uid) => (
            <View key={uid} style={styles.row}>
              <Image source={require('../../../../assets/images/default_ava.jpg')} style={styles.ava} />
              <Text style={styles.person}>Alice</Text>
              <Text style={styles.right}>${perPerson.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#173326', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    paddingHorizontal: 16, paddingTop: 8, paddingBottom: 22,
    borderTopWidth: 1, borderColor: Colors.border,
  },
  grabber: { alignSelf: 'center', width: 48, height: 4, borderRadius: 2, backgroundColor: '#3c4a43', marginBottom: 10 },
  name: { color: '#fff', fontWeight: '700', fontSize: 18, textAlign: 'center' },
  amount: { color: Colors.primary, fontWeight: '800', fontSize: 24, textAlign: 'center', marginTop: 6 },
  sharedPill: {
    alignSelf: 'center', marginTop: 6, paddingVertical: 2, paddingHorizontal: 10, borderRadius: 8,
    backgroundColor: '#1e2f26', color: '#9edfb9', fontWeight: '700', fontSize: 12,
  },
  row: {
    backgroundColor: '#11231b', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 12,
    borderWidth: 1, borderColor: Colors.border, flexDirection: 'row', alignItems: 'center',
    marginBottom: 10,
  },
  ava: { width: 24, height: 24, borderRadius: 12, marginRight: 10 },
  person: { color: '#fff', fontWeight: '600', flex: 1 },
  right: { color: '#fff', fontWeight: '700' },
});