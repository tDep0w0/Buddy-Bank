import { Colors } from "../../../constants/colors";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title:"Profile",
        headerTitleAlign: "center",
        headerStyle: {
            backgroundColor: Colors.background,     
        },
        headerTitleStyle: {
          color: "white",
          fontSize: 18,
          fontWeight: "600",
        },
        headerTintColor: "white",
      }}
    />

    
  );
}
