import { View} from "react-native";
import { Colors } from "../../../constants/colors";
import { StyleSheet } from "react-native";
import ActionButton from "@/components/appTab/Button";
import LockIcon from '../../../../assets/images/lock.svg';

import React from "react";


export default function EditProfile() {
  return (
    <View style={styles.container}>
      <ActionButton
          symbol={<LockIcon width={20} height={20} fill="white" />}
          type="change"
          onPress={() => console.log("Change Password Request")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background
  },

})
