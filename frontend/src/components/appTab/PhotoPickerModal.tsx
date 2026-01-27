import React from "react";
import {Modal,View,TouchableOpacity,Text,StyleSheet,Alert,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/constants/colors";

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onPick: (uri: string) => void;
}

export default function ImagePickerModal({
  visible,
  onClose,
  onPick,
}: ImagePickerModalProps) {
  const pickFromGallery = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      onPick(result.assets[0].uri);
      onClose();
    }
  };

  const takePhoto = async () => {
    const { status } =
      await ImagePicker.requestCameraPermissionsAsync();
    console.log("Camera permission:", status);
    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow camera access.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing:true,
      quality: 1,
    });
    console.log("Camera result:", result);

    if (!result.canceled && result.assets?.length) {
      onPick(result.assets[0].uri);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <TouchableOpacity style={styles.modalItem} onPress={pickFromGallery}>
            <Text style={styles.modalText}>Choose from gallery</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.modalItem} onPress={takePhoto}>
            <Text style={styles.modalText}>Take a photo</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.modalItem} onPress={onClose}>
            <Text style={[styles.modalText, { color: Colors.red }]}>
              Cancel
            </Text>
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
