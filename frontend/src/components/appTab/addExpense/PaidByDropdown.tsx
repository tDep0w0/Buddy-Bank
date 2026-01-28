// components/add-expense/PaidByDropdown.tsx
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Avatar } from '../common/Avatar';

export type Person = { id: string; name: string; avatar?: string };

type Props = {
  visible: boolean;
  people: Person[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onClose: () => void;
  anchor?: { x?: number; y?: number; width?: number; height?: number };
};

export const PaidByDropdown: React.FC<Props> = ({
  visible,
  people,
  selectedId,
  onSelect,
  onClose,
  anchor,
}) => {
  const BORDER = Colors.border;
  const top = (anchor?.y ?? 0) + (anchor?.height ?? 52) + 8;
  const right = 16;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* Overlay closes when tap outside of it. */}
      <Pressable style={StyleSheet.absoluteFillObject as any} onPress={onClose} />

      {/* Panel drops down from the right corner, located below the tab. */}
      <View style={[styles.panelWrap, { paddingTop: top + 350, paddingRight: right }]}>
        <View style={[styles.panel, { backgroundColor: Colors.surface, borderColor: BORDER }]}>
          {people.map((p, idx) => {
            const selected = p.id === selectedId;
            return (
              <Pressable
                key={p.id}
                onPress={() => { onSelect(p.id); onClose(); }}
                style={[
                  styles.row,
                  selected && { backgroundColor: 'rgba(0,200,83,0.12)' },
                  idx === 0 && { borderTopLeftRadius: 12, borderTopRightRadius: 12 },
                  idx === people.length - 1 && { borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
                ]}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                  <Avatar name={p.name} uri={p.avatar} />
                  <Text style={styles.name}>{p.name}</Text>
                </View>
                {selected && <Ionicons name="checkmark" size={20} color={Colors.primary} />}
              </Pressable>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  panelWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-end',
  },
  panel: {
    minWidth: 186,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  row: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: { color: 'white', fontSize: 16 },
});