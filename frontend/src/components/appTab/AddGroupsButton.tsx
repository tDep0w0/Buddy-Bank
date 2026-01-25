import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
}

const AddGroupsButton: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Ionicons name="add" size={20} color={Colors.background}/>
        <Text style={styles.text}>Create Group</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    color: Colors.background,
    fontWeight: '700', 
    fontSize: 17,
    marginLeft: 2,
  }
});

export default AddGroupsButton;
