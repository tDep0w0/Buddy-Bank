// app/appTab/groupTab/index.tsx
import React, { useCallback, useEffect, useState } from "react";
import { View, TextInput, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Colors } from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";

import AddGroupsButton from "@/components/appTab/AddGroupsButton";
import GroupScreenExpanButton from "@/components/appTab/GroupScreenExpandButton";

import { supabase } from '@/services/supabase';
import { getGroups } from "@/services/group";

type GroupListItem = {
  id: string;
  name: string;
  status: "You are owed" | "You owe" | "Settled up";
  amount?: number;
  type: "group";
  image_url?: string | null;
};

export default function GroupTab() {
  const [userId, setUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [groups, setGroups] = useState<GroupListItem[]>([]);

  // Lấy UID khi mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        Alert.alert("Error", error.message);
        setLoading(false);
        return;
      }

      if (!mounted) return;

      const uid = data.user?.id ?? null;
      setUserId(uid);

      if (!uid) {
        // If not logged in (no session), redirect to login (or let the global listener handle it)
        router.replace("/authTab/login");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Debounce search input -> query
  useEffect(() => {
    const t = setTimeout(() => setQuery(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  const mapToUi = useCallback((rows: { id: string; name: string; image_url?: string | null; balance: number }[]): GroupListItem[] => {
    return rows.map((r) => {
      if (r.balance > 0) {
        return { id: r.id, name: r.name, image_url: r.image_url ?? null, status: "You are owed", amount: r.balance, type: "group" };
      }
      if (r.balance < 0) {
        return { id: r.id, name: r.name, image_url: r.image_url ?? null, status: "You owe", amount: Math.abs(r.balance), type: "group" };
      }
      return { id: r.id, name: r.name, image_url: r.image_url ?? null, status: "Settled up", type: "group" };
    });
  }, []);

  const fetchGroups = useCallback(async (opts?: { silent?: boolean }) => {
    if (!userId) return;
    try {
      if (!opts?.silent) setLoading(true);
      const rows = await getGroups(userId, query);
      //Rows have the format: { id, name, image_url, balance }
      setGroups(mapToUi(rows));
    } catch (e: any) {
      Alert.alert("Không thể tải nhóm", e?.message ?? "Đã xảy ra lỗi.");
    } finally {
      if (!opts?.silent) setLoading(false);
    }
  }, [userId, query, mapToUi]);

  // Load the first time and when the query changes.
  useEffect(() => {
    if (userId) {
      fetchGroups();
    }
  }, [userId, query, fetchGroups]);

  // Reload when the screen is focused again.
  useFocusEffect(
    useCallback(() => {
      if (userId) fetchGroups({ silent: true });
    }, [userId, fetchGroups])
  );

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    if (!userId) return;
    try {
      setRefreshing(true);
      const rows = await getGroups(userId, query);
      setGroups(mapToUi(rows));
    } catch (e: any) {
      Alert.alert("Cannot load group", e?.message ?? "An error has occurred.");
    } finally {
      setRefreshing(false);
    }
  }, [userId, query, mapToUi]);

  return (
    <View style={styles.container}>
      <View style={{ position: "relative", width: "100%", height: 75 }}>
        <Ionicons
          name="search"
          size={24}
          color={Colors.textGray}
          style={{ position: "absolute", top: "22%", left: 16, zIndex: 1 }}
        />
        <TextInput
          placeholder="Search your group..."
          placeholderTextColor={Colors.textGray}
          style={styles.search}
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
      </View>
      <View style={styles.separatorLine} />

      {loading ? (
        <ActivityIndicator size="small" color={Colors.primary} style={{ marginTop: 16 }} />
      ) : (
        <GroupScreenExpanButton
          groups={groups}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

      <AddGroupsButton onPress={() => router.push("/otherTab/createGroup")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  search: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginBottom: 18,
    marginTop: 2,
    paddingLeft: "12%",
  },
  separatorLine: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.textGray,
    marginBottom: 18,
  },
});