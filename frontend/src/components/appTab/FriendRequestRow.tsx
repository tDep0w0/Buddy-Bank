import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import {TouchableOpacity} from "react-native";

interface Props {
  name: string;
  onAccept: () => void;
  onDecline: () => void;
}

export default function FriendRequestRow({
  name,
  onAccept,
  onDecline,
}: Props) {
  return (
    <View style={styles.card}>
      {/* Top row: avatar + name */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {name.charAt(0)}
          </Text>
        </View>

        <Text style={styles.name}>{name}</Text>
      </View>

      {/* Buttons row */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.decline}>
          <Text style={styles.declineText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.accept}>
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#16231c",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
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

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  decline: {
    borderWidth: 1,
    borderColor: Colors.red,
    paddingVertical: 12,
    paddingHorizontal: 65,
    borderRadius: 12,
  },

  declineText: {
    color: Colors.red,
    fontWeight: "600",
  },

  accept: {
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    paddingHorizontal: 65,
    borderRadius: 12,
  },

  acceptText: {
    color: "white",
    fontWeight: "600",
  },
});
