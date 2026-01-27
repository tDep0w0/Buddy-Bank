import { View, FlatList, StyleSheet } from "react-native";
import GroupRow from "../appTab/GroupRow";
import { Colors } from "../../constants/colors";
import { router } from "expo-router";

type Friend = {
  id: string;
  name: string;
  status: "You are owed" | "You owe" | "Settled up";
  amount?: number;
  type: "group" | "friend";
};

const mockGroups: Friend[] = [
  { id: "1", name: "Sarah", status: "You are owed", amount: 70, type: 'friend' },
  { id: "2", name: "Tom", status: "Settled up", type: 'friend' },
  { id: "3", name: "Ben", status: "You owe", amount: 200, type: 'friend' },
  { id: "4", name: "Faith", status: "You are owed", amount: 120, type: 'friend' },
  { id: "5", name: "Tim", status: "You owe", amount: 10, type: 'friend' },
  { id: "6", name: "Chole", status: "Settled up", type: 'friend' },
  { id: "7", name: "Dat", status: "You are owed", amount: 10, type: 'friend' },
  { id: "8", name: "Tony", status: "Settled up", type: 'friend' },
];

export default function FriendScreenExpanButton() {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockGroups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroupRow
            group={item}
            onPress={() =>
              router.push(`/otherTab/debtDetail?id=${item.id}`)
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
