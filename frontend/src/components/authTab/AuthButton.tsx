import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import ArrowRight from '../../../assets/images/arrow_right.svg';
import { Colors } from '../../constants/colors';

export interface AuthButtonProps {
  title: string;
  onPress: () => void | Promise<void>;
  disabled?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={!!disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <View style={styles.content}>
        <Text style={[styles.text, disabled && styles.textDisabled]}>{title}</Text>
        <ArrowRight width={20} height={20} fill={disabled ? '#888' : 'black'} style={{ marginLeft: 8 }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textDisabled: {
    color: '#222', 
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AuthButton;
