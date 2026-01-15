import { router } from "expo-router";
import { View, Text, Button } from "react-native";
import { Colors } from "../../../constants/colors";
import { StyleSheet } from "react-native";

export default function GroupTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Group Tab!</Text>
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
