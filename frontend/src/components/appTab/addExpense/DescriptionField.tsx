import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onNotesPress?: () => void;
};

export const DescriptionField: React.FC<Props> = ({ value, onChange, onNotesPress }) => {
  const inputBg = 'rgba(255,255,255,0.03)';
  const border = 'rgba(255,255,255,0.06)';
  return (
    <View style={styles.row}>
      <View style={[styles.inputWrap, { backgroundColor: inputBg, borderColor: border }]}>
        <TextInput
          placeholder="What is this for?"
          placeholderTextColor={Colors.textGray}
          value={value}
          onChangeText={onChange}
          style={styles.input}
        />
      </View>
      <Pressable onPress={onNotesPress} style={[styles.iconBtn, { backgroundColor: inputBg, borderColor: border }]}>
        <Ionicons name="chatbox-outline" color="#E6EFE9" size={22} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12 },
  inputWrap: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  input: {
    color: '#E6EFE9',
    paddingVertical: 14,
    fontSize: 16,
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});