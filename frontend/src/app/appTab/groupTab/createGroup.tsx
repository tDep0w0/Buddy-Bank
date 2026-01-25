import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../../constants/colors";
import GroupPhotoPicker from "@/components/appTab/GroupPhotoPicker";
import GroupNameInput from "@/components/appTab/GroupNameInput";


const CreateGroup = () => {
  const [groupName, setGroupName] = useState<string>("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <GroupPhotoPicker avatarUrl={undefined} onChangeAvatar={() => { }} />
        </View>
        <View style={{ flex: 7, justifyContent: 'center', alignItems: 'center' }}>
          <GroupNameInput value={groupName} onChange={setGroupName} />
        </View>
      </View>

      <View style={{ position: "relative", width: "90%", height: 75,  }}>
        <Ionicons name="search" size={24} color={Colors.textGray} style={{ position: "absolute", top: "22%", left: 16, zIndex: 1 }} />
        <TextInput
          placeholder="Search friend by name"
          placeholderTextColor={Colors.textGray}
          style={styles.search}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    width: "95%"
  },
  search: {
    borderWidth: 1,
    borderColor: Colors.textGray,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 18,
    fontSize: 18,
    fontWeight: "400",
    color: "white",
    paddingLeft: "13%",
  },
});

export default CreateGroup;
