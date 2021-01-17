import { Auth } from 'aws-amplify';
import React, { FC } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Settings: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Settings screen</Text>
      <TouchableOpacity
        onPress={() => {
          Auth.signOut();
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
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
