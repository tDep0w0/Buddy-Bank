import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";

type ButtonType = "Add" | "Sent" | "Friends" | "Unsend";

interface Props {
  type: ButtonType;
  onPress: () => void;
  symbol?: React.ReactNode;
  title?: string;
  disabled?: boolean;
}

const ActionButton: React.FC<Props> = ({ type, onPress, symbol, title, disabled }) => {
  const config = buttonConfig[type];

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        config.buttonStyle,
        disabled && styles.disabled,
      ]}
    >
      {symbol && <View style={{ marginRight: 6 }}>{symbol}</View>}

      <Text style={[styles.text, config.textStyle]}>
        {title || config.label}
      </Text>
    </TouchableOpacity>
  );
};

/* ---------------- CONFIG ---------------- */

const buttonConfig = {
  Add: {
    label: "Add",
    buttonStyle: { backgroundColor: "#22c55e" },
    textStyle: { color: "#fff" },
  },
  Unsend: {
    label: "Unsend",
    buttonStyle: { backgroundColor: "#dc2626" },
    textStyle: { color: "#fff" },
  },
  Sent: {
    label: "Sent",
    buttonStyle: {
      backgroundColor: Colors.background,
      borderWidth: 1,
      borderColor: "#52525b",
    },
    textStyle: { color: "#a1a1aa" },
  },
  Friends: {
    label: "Friends",
    buttonStyle: {
      backgroundColor: "#1e3a8a",
    },
    textStyle: { color: "#fff" },
  },
};

/* ---------------- STYLE ---------------- */

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 8,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },

  disabled: {
    opacity: 0.5,
  },
});

export default ActionButton;
