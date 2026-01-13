import { router } from "expo-router";
import { View, Text, Button } from "react-native";

export default function FriendTab() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to FriendTab!</Text>
      <Button
        title="Log out"
        onPress={() => router.replace("/authTab/login")}
      />
    </View>
  );
}
