import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/colors";
import { useLocalSearchParams } from "expo-router";

export default function GroupDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome to Group Detail Screen. ID: {id} 
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: Colors.primary,
    fontSize: 20,
  },
});
