import { router } from "expo-router";
import { View, Text, Button, StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";

export default function FriendTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Friend Tab!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: "white"
  }
})