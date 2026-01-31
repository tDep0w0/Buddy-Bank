import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {DEFAULT_AVATARS,DefaultAvatarKey,} from "../../../assets/images/Generic_Profile_Avatar";
import { Colors } from "@/constants/colors";

interface Props {
  selectedKey?: DefaultAvatarKey | null;
  onSelect: (key: DefaultAvatarKey) => void;
}

export default function DefaultAvatarPicker({
  selectedKey,
  onSelect,
}: Props) {
  return (
    <View style={styles.grid}>
      {Object.entries(DEFAULT_AVATARS).map(([key, Svg]) => {
        const isSelected = key === selectedKey;

        return (
          <TouchableOpacity
            key={key}
            style={[
              styles.item,
              isSelected && styles.selectedItem,
            ]}
            onPress={() => onSelect(key as DefaultAvatarKey)}
            activeOpacity={0.8}
          >
            <Svg width={40} height={40} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    justifyContent: "center",
  },
  item: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedItem: {
    borderColor: Colors.primary,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
});
