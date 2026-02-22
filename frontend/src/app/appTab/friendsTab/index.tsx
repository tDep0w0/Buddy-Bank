// app/appTab/friendTab/index.tsx
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Text,
} from "react-native";
import { Colors } from "../../../constants/colors";
import FriendRow from "../../../components/appTab/FriendRow";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "@/services/supabase";     
import { getFriends } from "@/services/friend";       
import { useFocusEffect } from "@react-navigation/native";

type FriendUI = {
  id: string;
  name: string;            // realname || username
  status: "settled" | "Owes you" | "You owe"; // Temporarily "setled" if there is no balance.
  amount?: number;
  image_url?: string | null;
};

export default function FriendsScreen() {
  const [userId, setUserId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); // debounced search
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [friends, setFriends] = useState<FriendUI[]>([]);

  // get UID when mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        Alert.alert("Lỗi", error.message);
        setLoading(false);
        return;
      }
      if (!mounted) return;
      const uid = data.user?.id ?? null;
      setUserId(uid);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setQuery(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  const mapToUI = useCallback(
    (rows: { id: string; username: string; realname: string; image_url?: string | null }[]): FriendUI[] => {
      // Since there is no friend-to-friend balance data, the default setting is "settled".
      return rows.map((f) => ({
        id: f.id,
        name: f.realname?.trim() ? f.realname : f.username,
        status: "settled",
        image_url: f.image_url ?? null,
      }));
    },
    []
  );

  const fetchFriends = useCallback(async (opts?: { silent?: boolean }) => {
    if (!userId) return;
    try {
      if (!opts?.silent) setLoading(true);
      const rows = await getFriends(userId, query);
      setFriends(mapToUI(rows));
    } catch (e: any) {
      Alert.alert("Unable to load friend list", e?.message ?? "An error has occurred.");
    } finally {
      if (!opts?.silent) setLoading(false);
    }
  }, [userId, query, mapToUI]);

  // Load lần đầu và khi query đổi
  useEffect(() => {
    if (userId) fetchFriends();
  }, [userId, query, fetchFriends]);

  // Refresh khi tab được focus trở lại (ví dụ quay lại từ màn hình khác)
  useFocusEffect(
    useCallback(() => {
      if (userId) fetchFriends({ silent: true });
    }, [userId, fetchFriends])
  );

  const onRefresh = useCallback(async () => {
    if (!userId) return;
    try {
      setRefreshing(true);
      const rows = await getFriends(userId, query);
      setFriends(mapToUI(rows));
    } catch (e: any) {
      Alert.alert("Unable to load friend list", e?.message ?? "An error has occurred.");
    } finally {
      setRefreshing(false);
    }
  }, [userId, query, mapToUI]);

  return (
    <View style={styles.container}>
      {/* Search box */}
      <View style={{ position: "relative", width: "100%", height: 75 }}>
        <Ionicons
          name="search"
          size={24}
          color={Colors.textGray}
          style={{ position: "absolute", top: "22%", left: 16, zIndex: 1 }}
        />
        <TextInput
          placeholder="Search by name or email"
          placeholderTextColor={Colors.textGray}
          style={styles.search}
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
      </View>

      <View style={styles.separatorLine} />

      {loading ? (
        <ActivityIndicator color={Colors.primary} style={{ marginTop: 16 }} />
      ) : (
        <FlatList
          data={friends}                     
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FriendRow friend={item} />}
          contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
          }
          ListEmptyComponent={
            <View style={{ paddingTop: 24 }}>
              <Text style={{ color: Colors.textGray, textAlign: "center" }}>
                {query ? "Không tìm thấy bạn nào phù hợp." : "Bạn chưa có bạn nào."}
              </Text>
            </View>
          }
          removeClippedSubviews
          initialNumToRender={12}
          maxToRenderPerBatch={12}
          windowSize={7}
        />
      )}
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