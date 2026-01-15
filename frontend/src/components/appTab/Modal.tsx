import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";

interface LogoutModalProps {
  visible: boolean;
  title: string;
  text1: string;
  text2: string;
  action1: () => void;
  action2: () => void;
}

const CustomizeModal: React.FC<LogoutModalProps> = ({ visible, title, text1, text2, action1, action2, ...rest }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <View style={styles.modalItem}>
            <Text style={styles.modalText}>{title}</Text>
          </View>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.modalItem} onPress={action1}>
            <Text style={[styles.modalText, { color: Colors.red, fontWeight: "600" }]}>
              {text1}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.modalItem} onPress={action2}>
            <Text style={styles.modalText}>{text2}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "75%",
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingVertical: 12,
  },
  modalItem: {
    paddingVertical: 14,
    alignItems: "center",
  },
  modalText: {
    color: "white",
    fontSize: 18,
    fontWeight: "400",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 2,
  },
});

export default CustomizeModal;
