import React, { useLayoutEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/colors";
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import EditNDeleteModal from '@/components/appTab/EditNDeleteModal';
import FriendScreenExpanButton from '@/components/appTab/FriendScreenExpandButton';
import HeaderExpenses from '@/components/appTab/HeaderExpenses';
import ExpensesContent from '@/components/appTab/ExpensesContent';
import AddExpensesButton from '@/components/appTab/AddExpenses';

export default function GroupDetail() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const buttonRef = useRef<View>(null);
  const [activeTab, setActiveTab] = useState<"expenses" | "balances">("expenses");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Group ${id}`,
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
      setModalPosition({ x: px - 130, y: py + height});
    });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === "expenses" && styles.activeTab]} onPress={() => setActiveTab("expenses")}
        >
          <Text style={[styles.tabText, activeTab === "expenses" && styles.activeTabText]}>
            Expenses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tab, activeTab === "balances" && styles.activeTab]} onPress={() => setActiveTab("balances")}
        >
          <Text style={[styles.tabText, activeTab === "balances" && styles.activeTabText]}>
            Balances
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.wrapper}>
        {activeTab === "expenses" ? (
          <View style={styles.expense}>
            <HeaderExpenses expense={{my: 190.50, total: 382.50}}/>
            <ExpensesContent/>
            <AddExpensesButton onPress={() => console.log("Add Expenses Button Pressed")}/>
          </View>
        ) : (
          <View style={styles.balance}>
            <FriendScreenExpanButton/>
          </View>
        )}
      </View>

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

    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  tabContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.surface,
    backgroundColor: Colors.surface,
    marginTop: 6,
  },
  tab: {
    flex: 1,
    paddingVertical: 18,
    alignItems: "center",
    borderRadius: 10,
    margin: 6,

  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    color: Colors.textGray,
    fontWeight: "600",
    fontSize: 16,
  },
  activeTabText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  wrapper: {
    flex: 1,
  },
  expense: {
    height: '100%',
  },
  balance: {
    flex: 1,
    paddingVertical: 16,
  }
});
