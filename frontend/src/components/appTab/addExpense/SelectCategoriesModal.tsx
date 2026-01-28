import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet, FlatList, ViewStyle, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

/** ------- Types ------- */
export type Category = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap; // Example: 'restaurant-outline'
  tint?: string; // circle background for icon
};

type Props = {
  visible: boolean;
  categories: Category[];       // category array for rendering UI
  selectedId?: string;          // selected id
  onSelect: (id: string) => void; // UI-only: emit to the outside
  onClose: () => void;
  containerStyle?: ViewStyle;   // Optional: Customize further if needed.
};

/** ------- Component ------- */
const SelectCategoriesModal: React.FC<Props> = ({
  visible,
  categories,
  selectedId,
  onSelect,
  onClose,
  containerStyle,
}) => {
  const BORDER = (Colors as any).border ?? 'rgba(255,255,255,0.08)';
  const overlayBg = 'rgba(0,0,0,0.55)';
  const rowDivider = 'rgba(255,255,255,0.06)';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay to close */}
      <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: overlayBg }]} onPress={onClose} />

      {/* Bottom sheet */}
      <View style={styles.bottomWrap} pointerEvents="box-none">
        <View style={[styles.sheet, { backgroundColor: Colors.surface, borderColor: BORDER }, containerStyle]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Select Category</Text>
            <Pressable hitSlop={8} onPress={onClose}>
              <Ionicons name="close" size={20} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* List */}
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: rowDivider }]} />}
            renderItem={({ item }) => {
              const selected = item.id === selectedId;
              return (
                <Pressable
                  onPress={() => {
                    onSelect(item.id);                 // UI-only
                    console.log('Selected category (UI)', item); // TODO backend: save category
                    onClose();
                  }}
                  style={[
                    styles.row,
                    selected && styles.rowSelected,
                  ]}
                >
                  {/* The gree highlight bar on the left when selected. */}
                  {selected && <View style={styles.leftAccent} />}

                  {/* Circle Left Icon */}
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: item.tint ?? 'rgba(255,255,255,0.08)' },
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={18}
                      color="#FFFFFF"
                    />
                  </View>

                  {/* Name */}
                  <Text style={styles.name}>{item.name}</Text>

                  {/* Check the box on the right if you want to select it. */}
                  {selected && <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />}
                </Pressable>
              );
            }}
            contentContainerStyle={{ paddingBottom: 8 }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SelectCategoriesModal;

/** ------- Styles ------- */
const styles = StyleSheet.create({
  bottomWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  sheet: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    maxHeight: '70%',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 64, // Leave space for the icons to be aligned.
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingRight: 14,
    gap: 12,
  },
  rowSelected: {
    backgroundColor: 'rgba(0,200,83,0.12)',
  },
  leftAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
});