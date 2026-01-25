import { Stack, useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";

export default function Layout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
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
            <View style={{ flexDirection: "row", gap: 16, marginRight: 4, }}>
              <Pressable onPress={() => router.push("/appTab/friendsTab/requests")}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color={Colors.primary}
                />
              </Pressable>

              <Pressable onPress={() => router.push("/appTab/friendsTab/add")}>
                <Ionicons
                  name="person-add-outline"
                  size={22}
                  color={Colors.primary}
                />
              </Pressable>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="requests"
        options={{
          headerShown: true,
          title: "Notifications",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTitleStyle: {
            color: "white",
            fontSize: 18,
            fontWeight: "600",
          },
          headerTintColor: Colors.primary,
        }}
      />

      <Stack.Screen
        name="add"
        options={{
          headerShown: true,
          title: "Add Friends",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTitleStyle: {
            color: "white",
            fontSize: 18,
            fontWeight: "600",
          },
          headerTintColor: Colors.primary,
        }}
      />
    </Stack>
  );
}