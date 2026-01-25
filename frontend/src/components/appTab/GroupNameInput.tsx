import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { Colors } from '@/constants/colors';

interface Props {
  value: string;
  onChange: (text: string) => void;
}

const GroupNameInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>GROUP NAME</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Summer Road Trip"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    width: '90%',
  },
  label: { 
    color: Colors.textGray,
    fontSize: 16,
    fontWeight: '600', 
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.textGray,
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
  },
});

export default GroupNameInput;
