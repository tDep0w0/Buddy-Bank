import { View, FlatList, StyleSheet } from "react-native";
import FriendRequestRow from "@/components/appTab/FriendRequestRow";
import { Colors } from "@/constants/colors";

const REQUESTS = [
  { id: "1", name: "Alice Smith" },
  { id: "2", name: "Bob Jones" },
  { id: "3", name: "Charlie Day" },
];

export default function FriendRequestsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={REQUESTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FriendRequestRow
            name={item.name}
            onAccept={() => console.log("Accepted", item.name)}
            onDecline={() => console.log("Declined", item.name)}
          />
        )}
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
