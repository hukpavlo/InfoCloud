import React, { FC } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Test1: FC = () => <Text>Home 1</Text>;

export const Home: FC = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator tabBarOptions={{ scrollEnabled: true }}>
        <Tab.Screen name="All" component={Test1} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
