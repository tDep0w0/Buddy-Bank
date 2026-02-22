import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import SectionTitle from './SectionTitle';
import ItemRow from './ItemRow';
import { router } from 'expo-router';
import type { Item, Member } from '../../../app/otherTab/review-item/types';

type Props = {
  items: Item[];
  members: Member[];
};

export default function ItemsList({ items, members }: Props) {
  return (
    <View>
      <View style={styles.headerRow}>
        <SectionTitle>Items</SectionTitle>

        <TouchableOpacity
          onPress={() => {
            // TODO backend: add new item
            console.log('Open Add Missing Item (UI)');
            router.push('/otherTab/review-item/add-missing-item')            
          }}
        >
          <Text style={styles.addLink}>+ Add missing item</Text>
        </TouchableOpacity>
      </View>

      <View>
        {items.map((it) => (
          <ItemRow key={it.id} item={it} members={members} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 8 
  },
  addLink: { 
    color: Colors.primary, 
    fontWeight: '700' 
  },
});