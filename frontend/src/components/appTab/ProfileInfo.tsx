import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/colors';

interface ProfileInfoProps {
  title: string;
  value: string;
  symbol: React.ReactNode;
  editable?: boolean;
  onChangeText?: (text: string) => void;
}

const ProfileInfoTF: React.FC<ProfileInfoProps> = ({
  title,
  value,
  symbol,
  editable = false,
  onChangeText,
}) => {
  return (
    <View style={{ width: '90%', marginBottom: 16 }}>
      <Text style={styles.key}>{title}</Text>

      <View style={styles.inputContainer}>
        {symbol}
        {editable ? (
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={styles.textInput}
            placeholderTextColor={Colors.textGray}
          />
        ) : (
          <Text style={styles.text}>{value}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  key: {
    color: Colors.textGray,
    fontWeight: '400',
    marginBottom: 8,
    paddingLeft: 8,
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
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  textInput: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
});

export default ProfileInfoTF;
