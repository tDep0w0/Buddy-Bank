import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";

export default function FriendRow({ friend }: any) {
  let statusText = "";
  let statusColor = "white";

  if (friend.status === "Owes you") {
    statusText = `Owes you $${friend.amount}`;
    statusColor = "#4ade80";
  } else if (friend.status === "You owe") {
    statusText = `You owe $${friend.amount}`;
    statusColor = "#f87171";
  }

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {friend.name.charAt(0)}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{friend.name}</Text>
        {statusText !== "" && (
          <Text style={{ color: statusColor }}>{statusText}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16231c",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontWeight: "700",
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
