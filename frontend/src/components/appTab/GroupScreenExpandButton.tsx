import { View, FlatList, StyleSheet } from "react-native";
import GroupRow from "../appTab/GroupRow";
import { Colors } from "../../constants/colors";
import { router } from "expo-router";

type Group = {
  id: string;
  name: string;
  status: "You are owed" | "You owe" | "Settled up";
  amount?: number;
};

const mockGroups: Group[] = [
  { id: "1", name: "Trip to Vegas", status: "You are owed", amount: 70 },
  { id: "2", name: "House Rent", status: "Settled up" },
  { id: "3", name: "Sunday Brunch", status: "You owe", amount: 200 },
  { id: "4", name: "Ski Trip 2024", status: "You are owed", amount: 120 },
  { id: "5", name: "Office Lunch", status: "You owe", amount: 10 },
  { id: "6", name: "Thanksgiving Trip", status: "Settled up" },
  { id: "7", name: "Christmas in Boston", status: "You are owed", amount: 10 },
  { id: "8", name: "Farewell Lunch", status: "Settled up" },
  { id: "9", name: "Boston to Hanoi", status: "You are owed", amount: 150 },
  { id: "10", name: "Vietnam Summer Trip", status: "You owe", amount: 180 },
];

export default function GroupScreenExpanButton() {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroupRow
            group={item}
            onPress={() =>
              router.push(`/otherTab/groupDetail?id=${item.id}`)
            }
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
  },
});
