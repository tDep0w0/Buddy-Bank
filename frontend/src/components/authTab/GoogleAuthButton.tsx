import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

interface GoogleAuthButtonProps {
  onPress: () => void;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Image
          source={require('../../../assets/google.png')}
          style={styles.icon}
        />
        <Text style={styles.text}>Continue with Google</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
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
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GoogleAuthButton;
