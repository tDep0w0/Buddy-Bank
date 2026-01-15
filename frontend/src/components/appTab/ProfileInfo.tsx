import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps, Text } from 'react-native';
import { Colors } from '../../constants/colors';


interface ProfileInfoProps extends TextInputProps {
  title: string;
  value: string;
  symbol: React.ReactNode
}

const ProfileInfoTF: React.FC<ProfileInfoProps> = ({ title, value, symbol, ...rest }) => {
  return (
    <View style={{ width: '90%', marginBottom: 16 }}>
      <Text style={styles.key}>{title}</Text>
      <View style={styles.inputContainer}>
        {symbol}
        <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  key: {
    color: Colors.textGray,
    fontWeight: '500',
    marginBottom: 8,
    paddingLeft: 8,
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
  inputContainer: {
    width: "100%",
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default ProfileInfoTF;
