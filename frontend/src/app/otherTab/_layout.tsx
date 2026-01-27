import { Colors } from "@/constants/colors";
import { Stack, router } from "expo-router";
import { View, Pressable, Text } from "react-native";

export default function Layout() {
  return (
    <Stack>
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
            <Pressable onPress={() => {
              router.back()
              console.log("Back Button Pressed")
            }
            }>
              <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: '600' }}>Back</Text>
            </Pressable>
          ),

          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 16, marginRight: 4, }}>
              <Pressable onPress={() => {
                router.back()
                console.log("Create Button Pressed")
              }}>
                <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: "600", }}>Create</Text>
              </Pressable>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="groupDetail"
        options={{
          headerShown: true,
          title: "Group Detail",
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
            <Pressable onPress={() => {
              router.back()
              console.log("Back Button Pressed")
            }
            }>
              <Text style={{ color: Colors.primary, fontSize: 18, fontWeight: '600' }}>Back</Text>
            </Pressable>
          ),

        }}
      />
    </Stack>
  );
}
