import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, Text } from 'react-native';
import { Colors } from '../../constants/colors';

interface AuthInputProps extends TextInputProps {
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({ name, placeholder, secureTextEntry, ...rest }) => {
  return (
    <View>
      <Text style={styles.name}>{name}</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          secureTextEntry={secureTextEntry}
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    color: '#fff',
    fontWeight: '500',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: Colors.surface,
    color: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
});

export default AuthInput;
