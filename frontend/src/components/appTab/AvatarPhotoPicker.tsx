import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import CameraIcon from "../../../assets/images/camera.svg";
import ImagePickerModal from "./PhotoPickerModal";

interface AvatarPickerProps {
  avatarUrl?: string;
  onChangeAvatar: (newUrl: string) => void;
}

export default function AvatarPicker({
  avatarUrl,
  onChangeAvatar,
}: AvatarPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image key={avatarUrl}
          source={
            avatarUrl
              ? { uri: avatarUrl }
              : require("../../../assets/images/default_ava.jpg")
          }
          style={styles.avatar}
        />

        <View style={styles.cameraButton}>
          <CameraIcon width={22} height={22} fill="white" />
        </View>
      </TouchableOpacity>

      <ImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPick={(uri) => {
          onChangeAvatar(uri);
          setModalVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 120,
    height: 120,
    marginBottom: 20,
    marginTop: 35,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.background,
  },
});
