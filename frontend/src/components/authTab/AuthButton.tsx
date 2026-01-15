import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import ArrowRight from '../../../assets/images/arrow_right.svg';
import { Colors } from '../../constants/colors';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.text}>{title}</Text>
        <ArrowRight width={20} height={20} fill="black" style={{ marginLeft: 8 }} />
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
  text: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 18,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AuthButton;
