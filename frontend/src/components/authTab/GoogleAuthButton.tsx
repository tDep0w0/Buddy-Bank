import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { Colors } from '../../constants/colors';

interface GoogleAuthButtonProps {
  onPress: () => void;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onPress }) => {
  return (
    <View>
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>Or continue with</Text>
        <View style={styles.separatorLine} />
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.content}>
          <Image
            source={require('../../../assets/images/google.png')}
            style={styles.icon}
          />
          <Text style={styles.text}>Google</Text>
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
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: '500',
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
