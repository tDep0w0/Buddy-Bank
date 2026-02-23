import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Colors } from "@/constants/colors";
import { useLocalSearchParams } from "expo-router";

export default function ViewReceiptScreen() {
  const { receiptImageUrl } = useLocalSearchParams<{
    receiptImageUrl?: string;
  }>();

  return (
    <View style={styles.screen}>
      <View style={styles.center}>
        {receiptImageUrl ? (
          <Image
            source={{ uri: receiptImageUrl }}
            style={styles.img}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.placeholder}>No receipt image available</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  img: { width: "100%", height: "100%" },
  placeholder: { color: Colors.textGray, fontSize: 16 },
});
