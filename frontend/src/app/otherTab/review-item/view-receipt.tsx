import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/colors';

export default function ViewReceiptScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.center}>
        <Image
          source={require('../../../../assets/images/dummy_bill.jpg')}
          style={styles.img}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  img: { width: '100%', height: '100%' },
});