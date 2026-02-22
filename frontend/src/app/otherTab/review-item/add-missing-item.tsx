import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/colors';
import SectionTitle from '@/components/appTab/reviewItems/SectionTitle';
import { router } from 'expo-router';

type Row = { id: string; name: string; included: boolean; amount: number };
const initialRows: Row[] = [
  { id: 'you', name: 'You', included: false, amount: 0 },
  { id: 'sarah', name: 'Sarah', included: false, amount: 0 },
  { id: 'mike', name: 'Mike', included: false, amount: 0 },
];

export default function AddMissingItemScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<string>('0');
  const [rows, setRows] = useState<Row[]>(initialRows);

  const toggleRow = (id: string) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, included: !r.included } : r));
  };

  const setAmount = (id: string, v: string) => {
    const num = Number(v) || 0;
    setRows(prev => prev.map(r => r.id === id ? { ...r, amount: num } : r));
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Item Name</Text>
        <TextInput
          placeholder="e.g. Extra Chips"
          placeholderTextColor={Colors.textGray}
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={[styles.label, { marginTop: 14 }]}>Price</Text>
        <View style={styles.inputRow}>
          <Text style={styles.prefix}>$</Text>
          <TextInput
            keyboardType="decimal-pad"
            value={price}
            onChangeText={setPrice}
            style={[styles.input, { flex: 1, marginTop: 0, backgroundColor: 'transparent', borderWidth: 0 }]}
          />
        </View>

        <View style={{ height: 12 }} />
        <SectionTitle>SPLIT BREAKDOWN</SectionTitle>

        <View>
          {rows.map(r => (
            <View key={r.id} style={styles.row}>
              <TouchableOpacity onPress={() => toggleRow(r.id)} style={[styles.radio, r.included && styles.radioOn]} />
              <Image source={require('../../../../assets/images/default_ava.jpg')} style={styles.avatarSmall} />
              <Text style={styles.rowName}>{r.name}</Text>

              <View style={styles.amountField}>
                <Text style={styles.currency}>$</Text>
                <TextInput
                  value={String(r.amount)}
                  keyboardType="decimal-pad"
                  onChangeText={(v) => setAmount(r.id, v)}
                  style={styles.amountInput}
                  editable={r.included}
                />
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 18 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            // TODO backend: lưu item mới
            console.log('Add Missing Item (UI)', {
              name,
              price: Number(price) || 0,
              split: rows.filter(r => r.included).map(r => ({ id: r.id, amount: r.amount })),
            });
            router.back();
          }}
          style={styles.primaryBtn}
          activeOpacity={0.9}
        >
          <Text style={styles.plus}>＋</Text>
          <Text style={styles.primaryText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  label: { color: Colors.textGray, marginTop: 8, marginBottom: 6 },
  input: {
    backgroundColor: Colors.surface, borderRadius: 12, padding: 12, color: '#fff',
    borderWidth: 1, borderColor: Colors.border,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface, borderRadius: 12, paddingHorizontal: 12,
    borderWidth: 1, borderColor: Colors.border,
  },
  prefix: { color: Colors.textGray, fontSize: 16, marginRight: 6 },
  row: {
    backgroundColor: Colors.surface, borderRadius: 12, padding: 12,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border,
    marginBottom: 10,
  },
  radio: {
    width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#82e1ae', marginRight: 10,
  },
  radioOn: { backgroundColor: '#11c26a' },
  avatarSmall: { width: 24, height: 24, borderRadius: 12, marginRight: 10 },
  rowName: { color: '#fff', fontWeight: '600', flex: 1 },
  amountField: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#0d1a14',
    borderRadius: 10, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: 10, height: 36,
  },
  currency: { color: Colors.textGray, marginRight: 4 },
  amountInput: { color: '#fff', minWidth: 60, textAlign: 'right' },
  footer: { padding: 12, backgroundColor: Colors.background },
  primaryBtn: { backgroundColor: Colors.primary, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
  plus: { color: '#083b1f', fontWeight: '900', marginRight: 8, fontSize: 18 },
  primaryText: { color: '#083b1f', fontWeight: '800', fontSize: 16 },
});