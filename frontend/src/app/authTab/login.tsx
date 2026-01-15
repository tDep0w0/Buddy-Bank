import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { router } from "expo-router";
import { Colors } from "../../constants/colors";

import AuthHeader from "../../components/authTab/AuthHeader";
import AuthInput from "../../components/authTab/AuthInput";
import AuthButton from "../../components/authTab/AuthButton";
import GoogleAuthButton from "../../components/authTab/GoogleAuthButton";
import AuthFooter from "../../components/authTab/AuthFooter";


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.replace("/appTab/groupTab");
  };

  const handleSignUp = () => {
    router.replace("/authTab/signup");
  };

  const handleGoogleLogin = () => {
    // Xử lý đăng nhập bằng Google ở đây 
    console.log("Google login pressed");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/icon.jpg")}
        style={{ width: 100, height: 100, alignSelf: "center", marginBottom: 15, borderRadius: 20 }}
      />

      <AuthHeader
        title="Welcome Back"
        subtitle="Sign in to track your group expenses"
      />

      <View style={{ marginBottom: 15 }}>
        <AuthInput
          name="Email"
          placeholder="name@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <AuthInput
          name="Password"
          placeholder="Enter your password here"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <AuthButton title="Login" onPress={handleLogin} />

      <GoogleAuthButton onPress={handleGoogleLogin} />

      <AuthFooter
        question="Don't have an account?"
        actionText="Sign Up"
        onActionPress={handleSignUp}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
});