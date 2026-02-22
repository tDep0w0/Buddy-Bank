import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { router } from 'expo-router';

type Props = { imagePath?: string };

export default function ViewReceiptButton({ imagePath }: Props) {
  return (
    <TouchableOpacity
      onPress={() => {
        // TODO backend: mở ảnh bill gốc nếu có
        console.log('Open receipt image (UI)', { imagePath });
        router.push('/otherTab/review-item/view-receipt');
      }}
      style={styles.btn}
    >
      <View style={styles.iconWrap}><Text style={styles.icon}>🧾</Text></View>
      <Text style={styles.text}>View Receipt</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
    borderWidth: 1, borderColor: Colors.border,
    flexDirection: 'row', alignItems: 'center',
  },
  iconWrap: {
    width: 24, height: 24, alignItems: 'center', justifyContent: 'center',
  },
  icon: { fontSize: 16, color: '#fff' },
  text: { color: '#fff', marginLeft: 8, fontWeight: '600' },
});
