import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

export const Settings: React.FC = () => {
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
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: '#fff',
  },
});
