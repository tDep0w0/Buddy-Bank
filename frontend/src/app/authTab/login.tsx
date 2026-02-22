import React, { useState } from "react";
import { View, StyleSheet, Image, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { Colors } from "../../constants/colors";

import AuthHeader from "../../components/authTab/AuthHeader";
import AuthInput from "../../components/authTab/AuthInput";
import AuthButton from "../../components/authTab/AuthButton";
import GoogleAuthButton from "../../components/authTab/GoogleAuthButton";
import AuthFooter from "../../components/authTab/AuthFooter";

import { signInWithEmailPassword, signInWithGoogle } from '../../services/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    try {
      setSubmitting(true);
      const res = await signInWithEmailPassword(email.trim(), password);
      if (!res.ok) {
        Alert.alert("Incorrect email or password", res.message);
        return;
      }
      router.replace("/appTab/groupTab");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "An unknown error has occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUp = () => {
    router.replace("/authTab/signup");
  };

  const handleGoogleLogin = async () => {
    try {
      setSubmitting(true);
      const res = await signInWithGoogle();
      if (!res.ok) {
        Alert.alert("Google Sign-In", res.message);
        return;
      }
      // Với OAuth, Supabase sẽ callback -> tạo session.
      // Nếu bạn đã set listener onAuthStateChange (mục 4), nó sẽ tự điều hướng.
      // Hoặc bạn có thể poll getSession sau vài giây rồi replace:
      // router.replace("/appTab/groupTab");
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Cannot login with Google");
    } finally {
      setSubmitting(false);
    }
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
          autoCapitalize="none"
        />
        <AuthInput
          name="Password"
          placeholder="Enter your password here"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <AuthButton title={submitting ? "Please wait..." : "Login"} onPress={handleLogin} disabled={submitting} />

      <GoogleAuthButton onPress={handleGoogleLogin} disabled={submitting} />

      {submitting ? <ActivityIndicator style={{ marginTop: 12 }} /> : null}

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