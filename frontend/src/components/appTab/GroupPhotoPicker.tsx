import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/colors";
import CameraIcon from '../../../assets/images/camera.svg';
import ImagePickerModal from "./PhotoPickerModal";

interface GroupPhotoPickerProps {
  avatarUrl?: string;
  onChangeAvatar: (newUrl: string) => void;
}

export default function GroupPhotoPicker({ avatarUrl, onChangeAvatar }: GroupPhotoPickerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.touchable}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder}>
            <CameraIcon width={32} height={32} fill={Colors.textGray} />
            <Text style={styles.placeholderText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <ImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onPick={(uri) => onChangeAvatar(uri)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
  touchable: {
    flex: 1,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  placeholder: {
    flex: 1,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.textGray,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  placeholderText: {
    marginTop: 6,
    fontSize: 12,
    color: Colors.textGray,
  },
});
