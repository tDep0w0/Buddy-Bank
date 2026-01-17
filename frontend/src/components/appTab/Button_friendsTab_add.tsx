import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";

type ButtonType = "Add" | "Sent" | "Friends";

interface Props {
  type: ButtonType;
  onPress: () => void;
  symbol?: React.ReactNode;
}

const ActionButton: React.FC<Props> = ({ type, onPress, symbol }) => {
  const isAdd = type === "Add";
  const isSent = type === "Sent";

  const label = isAdd ? "Add" : isSent ? "Sent" : "Friends";

  return (
    <TouchableOpacity
      disabled={!isAdd}
      onPress={onPress}
      style={[
        styles.button,
        isAdd ? styles.primaryButton : styles.secondaryButton,
        !isAdd && styles.disabled,
      ]}
    >
      {symbol && <View style={{ marginRight: 6 }}>{symbol}</View>}

      <Text
        style={[
          styles.text,
          isAdd ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    width: "20%",
    marginVertical: 8,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },

  primaryButton: {
    backgroundColor: "#22c55e",
  },

  primaryText: {
    color: "#fff",
  },

  secondaryButton: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: "#3f3f46",
  },

  secondaryText: {
    color: "#9ca3af",
  },

  disabled: {
    opacity: 0.6,
  },
});

export default ActionButton;
