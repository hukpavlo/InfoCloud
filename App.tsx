import React from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';

import config from './src/config';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text style={styles.text}>Environment: {config.ENVIRONMENT}</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;
