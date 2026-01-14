import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import ArrowRight from '../../../assets/images/arrow_right.svg';

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
    backgroundColor: '#00C853',
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
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
