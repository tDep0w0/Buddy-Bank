import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
} from "react-native";
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

import { supabase } from "@/services/supabase";
import { Database } from "@/types/database";
import { signOut } from '@/services/auth';
import {
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  changePassword,
  UserProfile,
} from "@/services/user";

type UserUpdate = Database["public"]["Tables"]["user"]["Update"];

export default function ProfileTab() {
  const navigation = useNavigation();

  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [isEditing, setIsEditing] = useState(false);
  const [avatar, setAvatar] = useState<AvatarValue | null>(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Backend state snapshot to compare change
  const [serverProfile, setServerProfile] = useState<UserProfile | null>(null);

  const [logoutVisible, setLogoutVisible] = useState(false);

  // Change password modal
  const [pwdModalVisible, setPwdModalVisible] = useState(false);
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [changingPwd, setChangingPwd] = useState(false);

  // Helpers: map image_url <-> AvatarValue
  const avatarFromImageUrl = (imageUrl: string | null): AvatarValue | null => {
    if (!imageUrl) return null;
    if (/^default:/.test(imageUrl)) {
      const key = imageUrl.replace(/^default:/, "");
      return { type: "default", key } as AvatarValue;
    }
    // coi là ảnh thật (public URL)
    return { type: "photo", uri: imageUrl } as AvatarValue;
  };

  const avatarToImageStrategy = (a: AvatarValue | null) => {
    if (!a) return { needsUpload: false, imageUrl: null as string | null };
    if (a.type === "default") {
      return { needsUpload: false, imageUrl: `default:${a.key}` };
    }
    if (a.type === "photo") {
      const isRemote = /^https?:\/\//i.test(a.uri);
      return { needsUpload: !isRemote, imageUrl: a.uri };
    }
    return { needsUpload: false, imageUrl: null };
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        const id = data.user?.id ?? null;
        if (!mounted) return;
        if (!id) {
          router.replace("/authTab/login");
          return;
        }
        setUid(id);

        const profile = await getUserProfile(id);
        if (!mounted) return;

        setServerProfile(profile);
        setEmail(profile.email || "");
        setName(profile.realname || "");
        setUsername(profile.username || "");
        setAvatar(avatarFromImageUrl(profile.image_url));
      } catch (e: any) {
        Alert.alert("Error", e?.message ?? "Failed to load profile");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Header button (Edit/Save)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
            if (isEditing) {
              await handleSave();
            } else {
              setIsEditing(true);
            }
          }}
        >
          <Text style={styles.headerButton}>{isEditing ? (saving ? "Saving..." : "Save") : "Edit"}</Text>
        </TouchableOpacity>
      ),
      headerBackTitleVisible: false,
      headerTintColor: Colors.primary,
    });
  }, [navigation, isEditing, name, username, avatar, saving]);

  const handleSave = async () => {
    if (!uid || !serverProfile) return;
    try {
      setSaving(true);

      const payload: Partial<UserUpdate> = {};

      const nameTrim = name.trim();
      if (nameTrim !== (serverProfile.realname ?? "")) {
        payload.realname = nameTrim;
      }

      // Username: tương tự
      const usernameTrim = username.trim();
      if (usernameTrim !== (serverProfile.username ?? "")) {
        payload.username = usernameTrim;
      }

      // Avatar
      const strategy = avatarToImageStrategy(avatar);
      let imageUrlToSave: string | null | undefined = undefined;

      if (strategy.needsUpload && strategy.imageUrl && uid) {
        const publicUrl = await uploadAvatar(uid, strategy.imageUrl);
        imageUrlToSave = publicUrl;
      } else if (strategy.imageUrl !== serverProfile.image_url) {
        imageUrlToSave = strategy.imageUrl;
      }

      if (typeof imageUrlToSave !== "undefined") {
        payload.image_url = imageUrlToSave; // <string | null>
      }

      if (Object.keys(payload).length > 0) {
        await updateUserProfile(uid, payload);
      }

      setIsEditing(false);
      Alert.alert("Success", "Profile updated.");
    } catch (e: any) {
      Alert.alert("Update failed", e?.message ?? "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  const doSignOut = async () => {
    try {
      await signOut?.();
      router.replace("/authTab/login");
    } catch (e: any) {
      Alert.alert("Logout failed", e?.message ?? "Unknown error");
    } finally {
      setLogoutVisible(false);
    }
  };

  const canEdit = useMemo(() => !loading && !!uid, [loading, uid]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <AvatarPicker avatar={avatar} onChangeAvatar={(a) => setAvatar(a)} />

      {/* Name */}
      <ProfileInfoTF
        title="Name"
        value={name}
        editable={isEditing && canEdit}
        onChangeText={setName}
        symbol={<Person width={20} height={20} fill="white" />}
      />

      {/* Username */}
      <ProfileInfoTF
        title="Username"
        value={username}
        editable={isEditing && canEdit}
        onChangeText={setUsername}
        symbol={<UserNameIcon width={20} height={20} fill="white" />}
      />

      {/* Email (read-only) */}
      <ProfileInfoTF
        title="Email"
        value={email}
        editable={false}
        symbol={<MailIcon width={20} height={20} fill="white" />}
      />

      {/* Change password */}
      <ActionButton
        symbol={<LockIcon width={20} height={20} fill={Colors.background} />}
        type="change"
        onPress={() => setPwdModalVisible(true)}
      />

      {/* Logout */}
      <ActionButton
        symbol={<LogOutIcon width={20} height={20} fill={Colors.red} />}
        type="logout"
        onPress={() => setLogoutVisible(true)}
      />

      {/* Confirm logout */}
      <CustomizeModal
        visible={logoutVisible}
        title="Log out of your account?"
        text1="Log out"
        text2="Cancel"
        action1={doSignOut}
        action2={() => setLogoutVisible(false)}
      />

      {/* Change Password Modal */}
      <Modal
        visible={pwdModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPwdModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              placeholder="New password"
              placeholderTextColor={Colors.textGray}
              secureTextEntry
              style={styles.modalInput}
              value={newPwd}
              onChangeText={setNewPwd}
            />
            <TextInput
              placeholder="Confirm new password"
              placeholderTextColor={Colors.textGray}
              secureTextEntry
              style={styles.modalInput}
              value={confirmPwd}
              onChangeText={setConfirmPwd}
            />

            <View style={styles.modalFooter}>
              <TouchableOpacity onPress={() => setPwdModalVisible(false)}>
                <Text style={[styles.modalBtn, { color: Colors.textGray }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  if (!newPwd || newPwd.length < 6) {
                    Alert.alert("Invalid", "Password must be at least 6 characters.");
                    return;
                  }
                  if (newPwd !== confirmPwd) {
                    Alert.alert("Mismatch", "Passwords do not match.");
                    return;
                  }
                  try {
                    setChangingPwd(true);
                    await changePassword(newPwd);
                    Alert.alert("Success", "Password changed.");
                    setPwdModalVisible(false);
                    setNewPwd("");
                    setConfirmPwd("");
                  } catch (e: any) {
                    Alert.alert("Failed", e?.message ?? "Cannot change password.");
                  } finally {
                    setChangingPwd(false);
                  }
                }}
                disabled={changingPwd}
              >
                <Text style={[styles.modalBtn, { color: Colors.primary }]}>
                  {changingPwd ? "Changing..." : "Save"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// styles
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

  // modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 16,
  },
  modalTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  modalInput: {
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginVertical: 6,
  },
  modalFooter: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBtn: {
    fontSize: 16,
    fontWeight: "600",
  },
});