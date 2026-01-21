import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { Colors } from "../../../constants/colors";
import CustomButton from "../../../components/appTab/Button_friendsTab_add";

const USERS = [
  { id: "1", name: "Jane Cooper", status: "add" },
  { id: "2", name: "Jane Miller", status: "sent" },
  { id: "3", name: "Janet Foster", status: "add" },
  { id: "4", name: "Theresa Webb", status: "friends" },
];

export default function AddFriendScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#999"
        style={styles.search}
      />

      <FlatList
        data={USERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>

            <CustomButton
              type={
                item.status === "add"
                  ? "Add"
                  : item.status === "sent"
                  ? "Sent"
                  : "Friends"
              }
              onPress={() => {
                /* Handle button press */
                console.log("Pressed ", item.name);
              }}
              />
          </View>
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
  search: {
    backgroundColor: "#1e2b24",
    borderRadius: 12,
    padding: 12,
    color: "white",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#16231c",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 16,
  },
});
