import React, { useLayoutEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/colors";
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import EditNDeleteModal from '@/components/appTab/EditNDeleteModal';

export default function GroupDetail() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const buttonRef = useRef<View>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Group ${id} Detail`,
      headerRight: () => (
        <View ref={buttonRef}>
          <TouchableOpacity onPress={handleButtonPress}>
            <Ionicons name="ellipsis-vertical" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, id]);

  const handleButtonPress = () => {
    buttonRef.current?.measure((fx, fy, width, height, px, py) => {
      setModalPosition({ x: px, y: py + height });
    });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to Group Detail Screen. ID: {id}
      </Text>

      <EditNDeleteModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEdit={() => console.log("Edit pressed")}
        onDelete={() => console.log("Delete pressed")}
        position={modalPosition}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 20,
  },
});
