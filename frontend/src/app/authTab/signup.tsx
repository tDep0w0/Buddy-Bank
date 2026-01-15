import React, { useState } from "react";
import { ScrollView, StyleSheet, Image, View } from "react-native";
import { router } from "expo-router";
import { Colors } from "../../constants/colors";

import AuthHeader from "../../components/authTab/AuthHeader";
import AuthInput from "../../components/authTab/AuthInput";
import AuthButton from "../../components/authTab/AuthButton";
import GoogleAuthButton from "../../components/authTab/GoogleAuthButton";
import AuthFooter from "../../components/authTab/AuthFooter";

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    router.replace("/appTab/groupTab");
  };

  const handleLogIn = () => {
    router.replace("/authTab/login");
  };

  const handleGoogleSignUp = () => {
    // Xử lý đăng nhập bằng Google ở đây 
    console.log("Google Sign Up pressed");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/icon.jpg")}
          style={{ width: 85, height: 85, alignSelf: "center", marginBottom: 15, borderRadius: 20 }}
        />

        <AuthHeader
          title="Create Account"
          subtitle="Start splitting expenses easily today"
        />

        <View style={{ marginBottom: 15 }}>
          <AuthInput
            name="Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            keyboardType="default"
          />
          <AuthInput
            name="Username"
            placeholder="Choose a username"
            value={userName}
            onChangeText={setUserName}
            keyboardType="default"
          />
          <AuthInput
            name="Email"
            placeholder="name@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <AuthInput
            name="Password"
            placeholder="Create a password here"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <AuthInput
            name="Confirm Password"
            placeholder="Confirm your password here"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <AuthButton title="Sign Up" onPress={handleSignUp} />

        <GoogleAuthButton onPress={handleGoogleSignUp} />

        <AuthFooter
          question="Already have an account?"
          actionText="Log In"
          onActionPress={handleLogIn}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingTop: 80,
    paddingBottom: 80,
    paddingHorizontal: 24,
  },
});