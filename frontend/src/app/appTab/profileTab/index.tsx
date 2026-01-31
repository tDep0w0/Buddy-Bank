import React, { useLayoutEffect, useState } from "react";
import {View,Text,StyleSheet,TouchableOpacity,} from "react-native";
import { router, useNavigation } from "expo-router";
import { Colors } from "../../../constants/colors";
import { AvatarValue } from "@/types/avatar";
import AvatarPicker from "@/components/appTab/AvatarPhotoPicker";
import ProfileInfoTF from "@/components/appTab/ProfileInfo";
import ActionButton from "@/components/appTab/Button";
import CustomizeModal from "@/components/appTab/Modal";
import Person from "../../../../assets/images/person.svg";
import UserNameIcon from "../../../../assets/images/@mail.svg";
import MailIcon from "../../../../assets/images/mail.svg";
import LockIcon from "../../../../assets/images/lock.svg";
import LogOutIcon from "../../../../assets/images/logout.svg";

export default function ProfileTab() {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<AvatarValue>({
    type: "default",
    key: "panda",
  });
  const [name, setName] = useState("Alex Johnson");
  const [username, setUsername] = useState("alexjohnson_99");
  const [logoutVisible, setLogoutVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (isEditing) {
              console.log("Saving profile:", {
                name,
                username,
                avatar,
              });
            }
            setIsEditing((prev) => !prev);
          }}
        >
          <Text style={styles.headerButton}>
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      ),
      headerBackTitleVisible: false,
      headerTintColor: Colors.primary,
    });
  }, [navigation, isEditing, name, username, avatar]);

  return (
    <View style={styles.container}>
      <AvatarPicker
        avatar={avatar}
        onChangeAvatar={setAvatar}
      />

      <ProfileInfoTF
        title="Name"
        value={name}
        editable={isEditing}
        onChangeText={setName}
        symbol={<Person width={20} height={20} fill="white" />}
      />

      <ProfileInfoTF
        title="Username"
        value={username}
        editable={isEditing}
        onChangeText={setUsername}
        symbol={<UserNameIcon width={20} height={20} fill="white" />}
      />

      <ProfileInfoTF
        title="Email"
        value="alexjohnson_99@gmail.com"
        symbol={<MailIcon width={20} height={20} fill="white" />}
      />

      <ActionButton
        symbol={<LockIcon width={20} height={20} fill={Colors.background} />}
        type="change"
        onPress={() => console.log("Change Password")}
      />

      <ActionButton
        symbol={<LogOutIcon width={20} height={20} fill={Colors.red} />}
        type="logout"
        onPress={() => setLogoutVisible(true)}
      />

      <CustomizeModal
        visible={logoutVisible}
        title="Log out of your account?"
        text1="Log out"
        text2="Cancel"
        action1={() => router.replace("../../authTab/login")}
        action2={() => setLogoutVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingTop: 20,
  },
  headerButton: {
    color: Colors.primary,
    marginRight: 4,
    fontSize: 18,
    fontWeight: "600",
  },
});
