import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Colors } from "../../constants/colors";

type Group = {
  id: string;
  name: string;
  status: string;
  amount?: number;
};

export default function GroupRow({ group, onPress, }: { group: Group; onPress: () => void; }) {
  let statusText = "";
  let statusColor = "white";

  if (group.status === "You are owed") {
    statusText = `You are owed $${group.amount}`;
    statusColor = Colors.primary;
  } else if (group.status === "You owe") {
    statusText = `You owe $${group.amount}`;
    statusColor = Colors.red;
  } else {
    statusText = "Settled up";
    statusColor = Colors.textGray;
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image
        style={styles.avatar}
        source={require("../../../assets/images/place.jpg")}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{group.name}</Text>
        <Text style={[{ color: statusColor }, styles.status]}>{statusText}</Text>
      </View>

      <Text style={styles.arrow}>{">"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginLeft: 4,
  },
  name: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    paddingBottom: 6,
  },
  status: {
    fontSize: 14,
  },
  arrow: {
    color: Colors.textGray,
    fontSize: 22,
    fontWeight: "600",
  },
});
