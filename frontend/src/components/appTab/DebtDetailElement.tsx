import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  debtor: string;
  creditor: string;
  amount: number;
  onUp: () => void;
  type: string;
}

export default function DebtDetailElement({ debtor, creditor, amount, onUp, type }: Props) {
  const colorAmount = type === 'owe'
    ? Colors.red
    : Colors.primary;
    
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={require("../../../assets/images/default_ava.jpg")}
          style={styles.avatar}
        />

        <View>
          <Text style={styles.textLine}>
            {debtor} owes {creditor}
          </Text>
          <Text style={[styles.amount, {color: colorAmount}]}>${amount}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.up} onPress={onUp}>
          <View style={styles.circle}>
            <Ionicons name="checkmark" size={22} color={Colors.primary} />
          </View>
          <Text style={styles.upText}>Settle Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    marginVertical: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 12,
    marginLeft: 12,
    width: '95%',
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },

  textLine: {
    color: Colors.textGray,
    fontSize: 16,
    fontWeight: "600",
  },

  amount: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 4,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },

  up: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    width: '95%'
  },

  upText: {
    color: Colors.background,
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18
  },

  circle: {
    width: 26,
    height: 26,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.background,
    marginRight: 8,
    backgroundColor: Colors.background,
  },
});