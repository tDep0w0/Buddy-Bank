import { Colors } from "@/constants/colors";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
            backgroundColor: Colors.background,
            borderBottomColor: Colors.textGray,
            borderBottomWidth: 0.5,
        },
        headerTitleStyle: {
          color: "white",
          fontSize: 18,
          fontWeight: "600",
        },
      }}
    />
  );
}
