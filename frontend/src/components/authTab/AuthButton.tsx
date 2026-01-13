import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00C853',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AuthButton;
