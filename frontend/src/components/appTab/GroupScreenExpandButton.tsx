// src/components/appTab/GroupScreenExpandButton.tsx
import React from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import GroupRow from "../appTab/GroupRow";
import { Colors } from "../../constants/colors";
import { router } from "expo-router";

type Group = {
  id: string;
  name: string;
  status: "You are owed" | "You owe" | "Settled up";
  amount?: number;
  type: "group" | "friend"; 
  image_url?: string | null;
};

type Props = {
  groups: Group[];
  refreshing?: boolean;
  onRefresh?: () => void;
};

export default function GroupScreenExpanButton({ groups, refreshing = false, onRefresh }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroupRow
            group={item}
            onPress={() => router.push(`/otherTab/groupDetail?id=${item.id}`)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
        }
        ListEmptyComponent={
          <View style={{ paddingVertical: 20 }} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});