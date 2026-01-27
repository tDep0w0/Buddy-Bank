import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef } from 'react';
import EditNDeleteModal from '@/components/appTab/EditNDeleteModal';
import { Colors } from '@/constants/colors';

type ExpenseInfo = {
  name: string;
  amount: number;
  time: string;
  payer: string;
};

export default function ExpensesRow({ expenseInfo }: { expenseInfo: ExpenseInfo }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const buttonRef = useRef<View>(null);

  const handleButtonPress = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setModalPosition({ x: x+ width , y: y + height });
    });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Ionicons name="car" size={32} color={Colors.primary} />
      </View>

      <View style={styles.textwrapper}>
        <Text style={styles.name}>{expenseInfo.name}</Text>
        <Text style={styles.paid}>
          Paid by <Text style={styles.payer}>{expenseInfo.payer}</Text>
        </Text>
      </View>

      <View style={styles.infowrapper}>
        <Text style={styles.money}>${expenseInfo.amount}</Text>
        <Text style={styles.time}>{expenseInfo.time}</Text>
      </View>

      <TouchableOpacity onPress={handleButtonPress}>
        <Ionicons name="ellipsis-vertical" size={20} color={Colors.textGray} />
      </TouchableOpacity>

      <EditNDeleteModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEdit={() => console.log("Edit pressed")}
        onDelete={() => console.log("Delete pressed")}
        position={modalPosition}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 26,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textwrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  paid: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textGray,
  },
  payer: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
  },
  infowrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginHorizontal: 12,
  },
  money: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  time: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textGray,
  },
});
