import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors } from "../../constants/colors";

import AuthHeader from "../../components/authTab/AuthHeader";
import AuthInput from "../../components/authTab/AuthInput";
import AuthButton from "../../components/authTab/AuthButton";
import GoogleAuthButton from "../../components/authTab/GoogleAuthButton";
import AuthFooter from "../../components/authTab/AuthFooter";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    router.replace("/appTab/friendsTab");
  };

  const handleLogIn = () => {
    router.replace("/authTab/login");
  };

  const handleGoogleSignUp = () => {
    // Xử lý đăng nhập bằng Google ở đây 
    console.log("Google Sign Up pressed");
  };

  return (
    <View style={styles.container}>
      <AuthHeader
        title="Create Account"
        subtitle="Join your friends and start splitting expenses easily"
      />

      <AuthInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <AuthInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AuthInput 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
        secureTextEntry 
      />

      <AuthButton title="Sign Up" onPress={handleSignUp} />

      <GoogleAuthButton onPress={handleGoogleSignUp} />

      <AuthFooter
        question="Already have an account?"
        actionText="Log In"
        onActionPress={handleLogIn}
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