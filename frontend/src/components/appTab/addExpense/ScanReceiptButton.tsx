import React, { useState } from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/colors";
import ImagePickerModal from "../PhotoPickerModal";
import { useRouter } from "expo-router";

interface ScanReceiptButtonProps {
  receiptUrl?: string;
  onChangeReceipt: (localUri: string) => void;
  loading?: boolean;

  amount?: number | string | null;
  desc?: string;
  date?: Date;
  paidById?: string;
}

export default function ScanReceiptButton({
  receiptUrl,
  onChangeReceipt,
  loading = false,
  amount,
  desc,
  date,
  paidById,
}: ScanReceiptButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const hasImage = !!receiptUrl && !loading;
  const buttonLabel = loading
    ? "Analyzing..."
    : hasImage
      ? "View Item"
      : "Scan Receipt";

  const handlePress = () => {
    if (loading) return;

    if (!hasImage) {
      setModalVisible(true);
      return;
    }

    // reviewStore is already populated by parent – just navigate
    router.push({
      pathname: "/otherTab/review-item",
      params: {
        amount: String(amount ?? 0),
        desc: desc ?? "",
        date: (date ?? new Date()).toISOString(),
        paidById: paidById ?? "",
      },
    });
  };

  return (
    <View>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.btn,
          loading && styles.btnDisabled,
          { opacity: pressed && !loading ? 0.9 : 1 },
        ]}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors.background} />
        ) : (
          <Ionicons
            name={hasImage ? "eye-outline" : "scan-outline"}
            size={20}
            color={Colors.background}
          />
        )}
        <Text style={styles.text}>{buttonLabel}</Text>
      </Pressable>

      <ImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPick={(avatar) => {
          if (avatar.type === "photo") {
            onChangeReceipt(avatar.uri);
          }
          setModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 120,
    borderRadius: 12,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  text: {
    color: Colors.background,
    fontWeight: "600",
    fontSize: 20,
    marginLeft: 4,
  },
});
