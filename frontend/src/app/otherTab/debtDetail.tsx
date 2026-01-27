import { View, FlatList, StyleSheet } from "react-native";
import DebtDetailElement from "@/components/appTab/DebtDetailElement";
import { Colors } from "@/constants/colors";

const DEBTS = [
  { id: "1", debtor: "Alice", creditor: "Jones", amount: 120, type: 'owe' },
  { id: "2", debtor: "Charlie", creditor: "Alice", amount: 75, type: 'owed' },
  { id: "3", debtor: "Alice", creditor: "Charlie", amount: 200, type: 'owe' },
  { id: "4", debtor: "Alice", creditor: "Peter", amount: 50, type: 'owe' },
  { id: "5", debtor: "Pong", creditor: "Alice", amount: 160, type: 'owed' },
  { id: "6", debtor: "Wong", creditor: "Alice", amount: 20, type: 'owed' },
];

export default function DebtDetailScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DEBTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DebtDetailElement
            debtor={item.debtor}
            creditor={item.creditor}
            amount={item.amount}
            onUp={() => console.log(item.creditor, "settle up pressed for", item.debtor)}
            type={item.type}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
});
