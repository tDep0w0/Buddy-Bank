import { router } from "expo-router";
import { View, Text, FlatList, TextInput, Button, StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";
import FriendRow from "../../../components/appTab/FriendRow";

const FRIENDS = [
  { id: "1", name: "Alice Smith", status:"settled"},
  { id: "2", name: "Bob Jones", status: "Owes you", amount: 15 },
  { id: "3", name: "Charlie Day", status: "settled" },
  { id: "4", name: "David Rose", status:"settled"},
  { id: "5", name: "Elena Fisher", status:"You owe", amount: 5.50},
  { id: "6", name: "George Thomas", status:"settled"}
];

export default function FriendsScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by name or email"
        placeholderTextColor={Colors.textGray}
        style={styles.search}
      />

      <FlatList
        data={FRIENDS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FriendRow friend={item} />}
        contentContainerStyle={{ paddingBottom: 24 }}
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
  search: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginBottom: 18,
    marginTop: 2,
  },
});
