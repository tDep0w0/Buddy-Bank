import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function SignupScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      <Text>Signup Screen</Text>
      <Button
        title="Create Account"
        onPress={() => router.replace("/appTab/friendsTab")}
      />
      <Button
        title="Already have account? Login"
        onPress={() => router.replace("/authTab/login")}
      />

    </View>
  );
}
