import { router, useNavigation } from "expo-router";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../../constants/colors";
import { useLayoutEffect } from "react";
import ActionButton from "@/components/appTab/Button";

export default function ProfileTab() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => router.push("/profileTab/screen/editProfile")}>
          <Text style={{ color: Colors.primary, marginRight: 14, fontSize:18, fontWeight:'600'}}>Edit</Text>
        </TouchableOpacity>),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Profile Tab!</Text>
      <ActionButton
        type="logout"
        onPress={() => router.replace("/authTab/login")}
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