import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface AuthFooterProps {
  question: string;
  actionText: string;
  onActionPress: () => void;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ question, actionText, onActionPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{question}</Text>
      <TouchableOpacity onPress={onActionPress}>
        <Text style={styles.link}> {actionText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  text: {
    color: '#ccc',
    fontSize: 15,
  },
  link: {
    color: '#00C853',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default AuthFooter;
