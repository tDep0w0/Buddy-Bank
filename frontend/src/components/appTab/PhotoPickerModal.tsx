import React, { useState } from "react";
import {Modal,View,TouchableOpacity,Text,StyleSheet,Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/constants/colors";
import DefaultAvatarPicker from "@/components/appTab/DefaultAvatarPicker";
import { AvatarValue } from "@/types/avatar";

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onPick: (avatar: AvatarValue) => void;
}

export default function ImagePickerModal({
  visible,
  onClose,
  onPick,
}: ImagePickerModalProps) {
  const [tempAvatar, setTempAvatar] = useState<AvatarValue | null>(null);

  const pickFromGallery = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow access to photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      setTempAvatar({
        type: "photo",
        uri: result.assets[0].uri,
      });
    }
  };

  const takePhoto = async () => {
    const { status } =
      await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission required", "Please allow camera access.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length) {
      setTempAvatar({
        type: "photo",
        uri: result.assets[0].uri,
      });
    }
  };

  const handleSave = () => {
    if (tempAvatar) {
      onPick(tempAvatar);
      setTempAvatar(null);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <TouchableOpacity style={styles.modalItem} onPress={takePhoto}>
            <Text style={styles.modalText}>Take Photo</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.modalItem} onPress={pickFromGallery}>
            <Text style={styles.modalText}>Upload from Gallery</Text>
          </TouchableOpacity>

        
          <Text style={styles.orText}>OR</Text>

          <DefaultAvatarPicker
            onSelect={(key) =>
              setTempAvatar({ type: "default", key })
            }
          />

          <View style={styles.footer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.modalText, { color: Colors.textGray }]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSave}
              disabled={!tempAvatar}
            >
              <Text
                style={[
                  styles.modalText,
                  {
                    color: tempAvatar
                      ? Colors.primary
                      : Colors.textGray,
                  },
                ]}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
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
    width: "85%",
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
  },
  modalItem: {
    paddingVertical: 14,
    alignItems: "center",
  },
  modalText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 10,
  },
  orText: {
    textAlign: "center",
    color: Colors.textGray,
    marginVertical: 12,
  },
  footer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
