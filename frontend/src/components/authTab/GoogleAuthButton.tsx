import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { Colors } from '../../constants/colors';

export interface GoogleAuthButtonProps {
  onPress: () => void | Promise<void>;
  disabled?: boolean;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onPress, disabled }) => {
  return (
    <View>
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>Or continue with</Text>
        <View style={styles.separatorLine} />
      </View>

      <TouchableOpacity
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={!!disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled: !!disabled }}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <View style={styles.content}>
          <Image
            source={require('../../../assets/images/google.png')}
            style={styles.icon}
          />
          <Text style={[styles.text, disabled && styles.textDisabled]}>Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.surface,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  text: {
    color: '#FFFFFF', // nếu surface là sáng, đổi sang '#000000'
    fontSize: 18,
    fontWeight: '500',
  },
  textDisabled: {
    color: '#e6e6e6', // hoặc '#888' nếu nền sáng
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#ccc',
    fontSize: 15,
  },
});

export default GoogleAuthButton;