import { Colors } from "@/constants/colors";
import { Stack } from "expo-router";
import { View, Pressable, Text } from "react-native";
import { router } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "My Groups",
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
        name="createGroup"
        options={{
          headerShown: true,
          title: "Create Group",
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

          headerBackTitle: '',
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: '600' }}>Back</Text>
            </Pressable>
          ),

          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 16, marginRight: 4, }}>
              <Pressable onPress={() => router.back()}>
                <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: "600", }}>Create</Text>
              </Pressable>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
