import { Colors } from "@/constants/colors";
import { Stack, router } from "expo-router";

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
    </Stack>
  );
}
