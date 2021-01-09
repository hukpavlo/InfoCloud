import React, { FC } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export const Settings: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Settings screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: '#000',
  },
});