import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Colors } from "@/constants/colors";
import CameraIcon from "../../../assets/images/camera.svg";
import ImagePickerModal from "./PhotoPickerModal";
import { AvatarValue } from "@/types/avatar";
import { DEFAULT_AVATARS } from "../../../assets/images/Generic_Profile_Avatar";

interface AvatarPickerProps {
  avatar: AvatarValue | null;
  onChangeAvatar: (avatar: AvatarValue) => void;
}

export default function AvatarPicker({
  avatar,
  onChangeAvatar,
}: AvatarPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const renderAvatar = () => {
   
    if (!avatar) {
      return <View style={styles.placeholder} />;
    }
    if (avatar.type === "photo") {
      return (
        <Image
          source={{ uri: avatar.uri }}
          style={styles.avatar}
        />
      );
    }
    const SvgAvatar = DEFAULT_AVATARS[avatar.key];

    if (!SvgAvatar) {
      return <View style={styles.placeholder} />;
    }

    return (
      <View style={styles.avatar}>
        <SvgAvatar width="100%" height="100%" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {renderAvatar()}

        <View style={styles.cameraButton}>
          <CameraIcon width={22} height={22} fill="white" />
        </View>
      </TouchableOpacity>

      <ImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPick={(newAvatar) => {
          onChangeAvatar(newAvatar);
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
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    backgroundColor: Colors.surface,
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
