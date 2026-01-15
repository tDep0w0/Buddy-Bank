import React, { useState } from "react";
import { View, Image, TouchableOpacity, Modal, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "@/constants/colors";
import CameraIcon from '../../../assets/images/camera.svg';

interface AvatarPickerProps {
    avatarUrl?: string;
    onChangeAvatar: (newUrl: string) => void;
}

export default function AvatarPicker({ avatarUrl, onChangeAvatar }: AvatarPickerProps) {
    const [modalVisible, setModalVisible] = useState(false);

    const pickFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            onChangeAvatar(result.assets[0].uri);
        }
        setModalVisible(false);
    };

    const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
            quality: 1,
        });

        if (!result.canceled) {
            onChangeAvatar(result.assets[0].uri);
        }
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Image
                source={avatarUrl ? { uri: avatarUrl } : require("../../../assets/images/Generic_Profile_Avatar/cat.svg")}
                style={styles.avatar}
            />

            <TouchableOpacity style={styles.cameraButton} onPress={() => setModalVisible(true)}>
                <CameraIcon width={22} height={22} fill="white" />
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    <TouchableOpacity style={styles.modalItem} onPress={pickFromGallery}>
                    <Text style={styles.modalText}>Choose from gallery</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalItem} onPress={takePhoto}>
                    <Text style={styles.modalText}>Take a photo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.modalItem} onPress={() => setModalVisible(false)}>
                    <Text style={[styles.modalText, { color: Colors.red }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
            
        </View>
    )
}

const styles = StyleSheet.create({ 
    container: { 
        position: "relative", 
        width: 120, 
        height: 120, 
    }, 
    avatar: { 
        width: "100%", 
        height: "100%", 
        borderRadius: 60, 
        borderWidth: 2, 
        borderColor: Colors.textGray, 
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
    modalOverlay: { 
        flex: 1, 
        backgroundColor: "rgba(0,0,0,0.4)", 
        justifyContent: "center", 
        alignItems: "center", 
    }, 
    modalBox: { 
        width: "75%", 
        backgroundColor: Colors.surface, 
        borderRadius: 12, 
        paddingVertical: 20, 
    }, 
    modalItem: { 
        paddingVertical: 14, 
        alignItems: "center", 
    },
    modalText: { 
        color: "white", 
        fontSize: 16, 
        fontWeight: "500", 
    }, 
});