import { router, useNavigation } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Colors } from "../../../constants/colors";
import { useLayoutEffect } from "react";
import ActionButton from "@/components/appTab/Button";
import ProfileInfoTF from "@/components/appTab/ProfileInfo";
import React from "react";
import Person from '../../../../assets/images/person.svg';
import UserNameIcon from '../../../../assets/images/@mail.svg';
import MailIcon from '../../../../assets/images/mail.svg';
import LogOutIcon from '../../../../assets/images/logout.svg';

export default function ProfileTab() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => router.push("/appTab/profileTab/editProfile")}>
          <Text style={{ color: Colors.primary, marginRight: 14, fontSize:18, fontWeight:'600'}}>Edit</Text>
        </TouchableOpacity>),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', alignItems: 'center', marginBottom: 40 }}>
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
        onPress={() => {
          Alert.alert(
            "Confirm Logout",
            "Are you sure you want to log out?",
            [
              { text: "Cancel", style: "cancel" },
              { 
                text: "Logout", 
                style: "destructive",
                onPress: () => router.replace("/authTab/login")
              }
            ]
          );
        }}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    width: '100%',
    paddingHorizontal: 20,
  },
});
