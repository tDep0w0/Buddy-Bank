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
  const inputBg = Colors.surface;
  const border = Colors.border;
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
        <Ionicons name="chatbox-outline" color='white' size={24} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  inputWrap: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  input: {
    color: 'white',
    paddingVertical: 16,
    fontSize: 18,
  },
  iconBtn: {
    width: 54,
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});