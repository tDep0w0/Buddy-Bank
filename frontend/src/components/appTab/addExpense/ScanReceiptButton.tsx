import React, { useState } from "react";
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import ImagePickerModal from '../PhotoPickerModal';
import { useRouter } from 'expo-router';

interface ScanReceiptButtonProps {
  receiptUrl?: string;
  onChangeReceipt: (newUrl: string) => void;

  amount?: number | string | null;
  desc?: string;
  date?: Date;              // nên là Date để toISOString()
  paidById?: string;
}

export default function ScanReceiptButton({
  receiptUrl,
  onChangeReceipt,
  amount,
  desc,
  date,
  paidById
}: ScanReceiptButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const hasImage = !!receiptUrl;
  const buttonLabel = hasImage ? 'View Item' : 'Scan Receipt';
  const iconName = hasImage ? 'eye-outline' : 'scan-outline';

  const handlePress = () => {
    if (!hasImage) {
      setModalVisible(true);
      return;
    }

    // Nếu đã có ảnh, điều hướng
    router.push({
      pathname: '/otherTab/review-item',
      params: {
        amount: String(amount ?? 0),
        desc: desc ?? '',
        date: (date ?? new Date()).toISOString(),
        paidById: paidById ?? '',
      },
    });
  };

  return (
    <View>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [styles.btn, { opacity: pressed ? 0.9 : 1 }]}
      >
        <Ionicons name={iconName} size={20} color={Colors.background} />
        <Text style={styles.text}>{buttonLabel}</Text>
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
}

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