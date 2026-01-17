import { router, useNavigation } from "expo-router";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from "react-native";
import { Colors } from "../../../constants/colors";
import { useLayoutEffect } from "react";
import ActionButton from "@/components/appTab/Button";
import ProfileInfoTF from "@/components/appTab/ProfileInfo";
import React, { useState } from "react";
import Person from '../../../../assets/images/person.svg';
import UserNameIcon from '../../../../assets/images/@mail.svg';
import MailIcon from '../../../../assets/images/mail.svg';
import LogOutIcon from '../../../../assets/images/logout.svg';
import AvatarPicker from "@/components/appTab/AvatarPicker";
import CustomizeModal from "@/components/appTab/Modal";

export default function ProfileTab() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => router.push("/appTab/profileTab/editProfile")}>
          <Text style={{ color: Colors.primary, marginRight: 4, fontSize: 18, fontWeight: '600' }}>Edit</Text>
        </TouchableOpacity>),
      headerBackTitleVisible: false,
      headerTintColor: Colors.primary,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>

      <View style={{ width: '100%', alignItems: 'center', marginBottom: 20 }}>

        <AvatarPicker avatarUrl={undefined} onChangeAvatar={() => { }} />

        <ProfileInfoTF
          title="Name"
          value="Alex Johnson"
          symbol={<Person width={20} height={20} fill="white" />}
        />
        <ProfileInfoTF
          title="Username"
          value="alexjohnson_99"
          symbol={<UserNameIcon width={20} height={20} fill="white" />}
        />
        <ProfileInfoTF
          title="Email"
          value="alexjohnson_99@gmail.com"
          symbol={<MailIcon width={20} height={20} fill="white" />}
        />
      </View>
      <ActionButton
        symbol={<LogOutIcon width={20} height={20} fill={Colors.red} />}
        type="logout"
        onPress={() => { setModalVisible(true) }}

      />

      <CustomizeModal
        visible={modalVisible}
        title="Log out of your account?"
        text1="Log out"
        text2="Cancel"
        action1={() => router.replace("../../authTab/login")}
        action2={() => setModalVisible(false)}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.background
  },
});
