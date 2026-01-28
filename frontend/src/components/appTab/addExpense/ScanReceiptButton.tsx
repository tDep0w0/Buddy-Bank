import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import ImagePickerModal from '../PhotoPickerModal';

interface ReceiptProps {
  receiptUrl?: string;
  onChangeReceipt: (newUrl: string) => void;
}

export default function ScanReceiptButton ({receiptUrl, onChangeReceipt} : ReceiptProps){
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)} style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.9 : 1 }]}>
        <Ionicons name="scan-outline" size={20} color={Colors.background} />
        <Text style={styles.text}>Scan Receipt</Text>
      </Pressable>

      <ImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPick={(uri) => {
          onChangeReceipt(uri);
          setModalVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 120,
    borderRadius: 12,
  },
  text: {
    color: Colors.background,
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 4,
  },
});
