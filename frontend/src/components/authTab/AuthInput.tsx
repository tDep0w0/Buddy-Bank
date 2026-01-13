import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface AuthInputProps extends TextInputProps {
  placeholder: string;
  secureTextEntry?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({ placeholder, secureTextEntry, ...rest }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#aaa"
      secureTextEntry={secureTextEntry}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default AuthInput;
