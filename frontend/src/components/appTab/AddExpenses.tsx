import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
}

const AddExpensesButton: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Ionicons name="add" size={20} color={Colors.background}/>
            <Text style={styles.text}>Add Expense</Text>
          </TouchableOpacity>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 30,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 120,
    borderRadius: 12,
  },
  text: {
    color: Colors.background,
    fontWeight: '700',
    fontSize: 20,
    marginLeft: 2,
  }
});

export default AddExpensesButton;