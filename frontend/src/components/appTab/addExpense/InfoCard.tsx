import React, { useMemo, useRef, useState } from 'react';
import { Pressable, Text, View, StyleSheet, LayoutChangeEvent, findNodeHandle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Avatar } from '../common/Avatar';
import { DateTimePickerModal } from './DateTimePickerModal';
import { PaidByDropdown, Person } from './PaidByDropdown';

export const RowTwoCols: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <View style={styles.row}>{children}</View>
);

// ---------- DateCard ----------
export const DateCard: React.FC<{
  date: Date;
  onChange?: (d: Date) => void; // UI-only: callback to the outside
}> = ({ date, onChange }) => {
  const [open, setOpen] = useState(false);
  const display = useMemo(
    () =>
      date.toLocaleString(undefined, {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
    [date],
  );

  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLabel}>DATE</Text>
          <Ionicons name="calendar-outline" size={20} color="white" />
        </View>
        <Text style={styles.cardValue}>{display}</Text>
      </Pressable>

      <DateTimePickerModal
        visible={open}
        initialDate={date}
        onClose={() => setOpen(false)}
        onConfirm={(d) => {
          onChange?.(d); // UI-only
        }}
      />
    </>
  );
};

// ---------- PaidByCard ----------
export const PaidByCard: React.FC<{
  selectedId: string;
  people: Person[];
  onChange?: (id: string) => void; // UI-only
}> = ({ selectedId, people, onChange }) => {
  const [open, setOpen] = useState(false);
  const cardRef = useRef<View>(null);
  const [anchor, setAnchor] = useState<{ x?: number; y?: number; width?: number; height?: number }>();

  const selectedName = useMemo(
    () => people.find((p) => p.id === selectedId)?.name ?? 'You',
    [people, selectedId],
  );

  function onLayout(e: LayoutChangeEvent) {
    // Use relative dimensions to position the dropdown (UI-only, sufficient for this purpose).
    setAnchor(e.nativeEvent.layout);
  }

  return (
    <>
      <Pressable ref={cardRef} onLayout={onLayout} onPress={() => setOpen(true)} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardLabel}>PAID BY</Text>
          <Ionicons name="chevron-down" size={20} color="white" />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Avatar name={selectedName} />
          <Text style={styles.cardValue}>{selectedName}</Text>
        </View>
      </Pressable>

      <PaidByDropdown
        visible={open}
        people={people}
        selectedId={selectedId}
        onSelect={(id) => onChange?.(id)}
        onClose={() => setOpen(false)}
        anchor={anchor}
      />
    </>
  );
};

const BORDER = (Colors as any).border ?? 'rgba(255,255,255,0.06)';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardLabel: {
    color: Colors.textGray,
    fontSize: 14,
    letterSpacing: 1.2,
  },
  cardValue: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});