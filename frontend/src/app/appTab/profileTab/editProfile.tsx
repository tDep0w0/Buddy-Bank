import { router } from "expo-router";
import { View, Text, Button } from "react-native";
import { Colors } from "../../../constants/colors";
import { StyleSheet } from "react-native";
import ActionButton from "@/components/appTab/Button";

export default function EditProfile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Edit Profile!</Text>
      <ActionButton
        type="change"
        onPress={() => console.log("Change Password Request")}
      />
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
