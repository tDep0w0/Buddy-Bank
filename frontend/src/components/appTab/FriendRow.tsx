import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function FriendRow({ friend }: any) {
  let statusText = "";
  let statusColor = "white";

  if (friend.status === "Owes you") {
    statusText = `Owes you $${friend.amount}`;
    statusColor = Colors.primary;
  } else if (friend.status === "You owe") {
    statusText = `You owe $${friend.amount}`;
    statusColor = Colors.red;
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
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 21,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginLeft: 4,
  },
  avatarText: {
    color: "white",
    fontWeight: "700",
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    paddingBottom: 2,
  },
});
