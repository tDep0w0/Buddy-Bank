import { View, FlatList, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";
import FriendRow from "../../../components/appTab/FriendRow";
import { Ionicons } from "@expo/vector-icons";

const FRIENDS = [
  { id: "1", name: "Alice Smith", status:"settled"},
  { id: "2", name: "Bob Jones", status: "Owes you", amount: 15 },
  { id: "3", name: "Charlie Day", status: "settled" },
  { id: "4", name: "David Rose", status:"settled"},
  { id: "5", name: "Elena Fisher", status:"You owe", amount: 5.50},
  { id: "6", name: "George Thomas", status:"settled"},
  { id: "7", name: "Dony Pham", status: "Owes you", amount: 30 },
  { id: "8", name: "Alex Kelly", status: "You owe", amount: 5.50 },
  { id: "9", name: "Dennis Nguyen", status: "settled" },
  { id: "10", name: "Doraemon Lou", status: "Owes you", amount: 21 },
  { id: "11", name: "Aless Faith", status: "settled" },
  { id: "12", name: "Thein Wo", status: "You owe", amount: 25 },
];

export default function FriendsScreen() {
  return (
    <View style={styles.container}>
      <View style={{ position: "relative", width: "100%", height: 75,}}>
        <Ionicons name="search" size={24} color={Colors.textGray} style={{ position: "absolute", top: "22%", left: 16, zIndex: 1 }} />
        <TextInput
          placeholder="Search by name or email"
          placeholderTextColor={Colors.textGray}
          style={styles.search}
        />
      </View>
      
      <View style={styles.separatorLine} />

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
    paddingLeft: "12%",
  },
  separatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.textGray,
    marginBottom: 18,
  },
});
