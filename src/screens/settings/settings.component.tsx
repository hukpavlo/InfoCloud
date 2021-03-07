import React, { FC } from 'react';
import { Auth } from 'aws-amplify';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Settings: FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => Auth.signOut()}>
        <Text style={styles.logout}>Logout</Text>
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
  logout: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
