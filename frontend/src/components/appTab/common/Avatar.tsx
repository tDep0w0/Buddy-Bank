import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';

type Props = {
  size?: number;
  uri?: string;
  name: string;
};

export const Avatar: React.FC<Props> = ({ size = 36, uri, name }) => {
  const initials = name
    .split(' ')
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: 20, height: 20, borderRadius: 20 }}
      />
    );
  }

  return (
    <Image
      style={{ width: 20, height: 20, borderRadius: 20 }}
      source={require("../../../../assets/images/default_ava.jpg")}
    />
  );
};

const styles = StyleSheet.create({
  fallback: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  text: {
    color: '#E6EFE9',
    fontWeight: '700',
  },
});