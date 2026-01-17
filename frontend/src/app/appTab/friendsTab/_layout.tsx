import { Stack, useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Friends",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerTitleStyle: {
          color: "white",
          fontSize: 18,
          fontWeight: "600",
        },
        headerRight: () => (
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Pressable
              onPress={() => router.push("/appTab/friendsTab/requests")}
            >
              <Ionicons
                name="notifications-outline"
                size={22}
                color="white"
              />
            </Pressable>

            <Pressable
              onPress={() => router.push("/appTab/friendsTab/add")}
            >
              <Ionicons
                name="person-add-outline"
                size={22}
                color="white"
              />
            </Pressable>
          </View>
        ),
      }}
    />
  );
}

