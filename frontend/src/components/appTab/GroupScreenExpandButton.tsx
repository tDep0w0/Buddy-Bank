import { View, FlatList, StyleSheet } from "react-native";
import GroupRow from "../appTab/GroupRow";
import { Colors } from "../../constants/colors";
import { router } from "expo-router";

type Group = {
  id: string;
  name: string;
  status: "You are owed" | "You owe" | "Settled up";
  amount?: number;
  type: "group" | "friend";
};

const mockGroups: Group[] = [
  { id: "1", name: "Trip to Vegas", status: "You are owed", amount: 70, type: "group" },
  { id: "2", name: "House Rent", status: "Settled up", type: "group" },
  { id: "3", name: "Sunday Brunch", status: "You owe", amount: 200, type: "group" },
  { id: "4", name: "Ski Trip 2024", status: "You are owed", amount: 120, type: "group" },
  { id: "5", name: "Office Lunch", status: "You owe", amount: 10, type: "group" },
  { id: "6", name: "Thanksgiving Trip", status: "Settled up", type: "group" },
  { id: "7", name: "Christmas in Boston", status: "You are owed", amount: 10, type: "group" },
  { id: "8", name: "Farewell Lunch", status: "Settled up", type: "group" },
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
