import { View, TextInput } from "react-native";
import { Colors } from "../../../constants/colors";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddGroupsButton from "@/components/appTab/AddGroupsButton";
import { router } from "expo-router";
import GroupScreenExpanButton from "@/components/appTab/GroupScreenExpandButton";

export default function GroupTab() {
  return (
    <View style={styles.container}>
      <View style={{ position: "relative", width: "100%", height: 75}}>
        <Ionicons name="search" size={24} color={Colors.textGray} style={{ position: "absolute", top: "22%", left: 16, zIndex: 1 }} />
        <TextInput
          placeholder="Search your group..."
          placeholderTextColor={Colors.textGray}
          style={styles.search}
        />
      </View>
      <View style={styles.separatorLine} />

      <GroupScreenExpanButton/>

      <AddGroupsButton onPress={() => router.push("/otherTab/createGroup")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  search: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: "12%",
  },
  separatorLine: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.textGray,
    marginBottom: 18,
  },
})
