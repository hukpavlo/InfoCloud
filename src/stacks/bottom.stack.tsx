import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ScreenName } from '@constants';
import { FolderList, Settings } from '@screens';

export const BottomStack: FC = () => {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <Navigator
      initialRouteName={ScreenName.FOLDER_LIST}
      tabBarOptions={{
        inactiveTintColor: 'grey',
        activeTintColor: 'rgb(0, 122, 255)',
        style: {
          borderTopWidth: 0.5,
          backgroundColor: '#f7f7f7',
          borderTopColor: 'darkgrey',
        },
      }}>
      <Screen
        component={FolderList}
        name={ScreenName.FOLDER_LIST}
        options={{
          tabBarLabel: 'Folders',
          tabBarIcon: ({ focused }) => (
            <Icon style={styles.reguralIcon} name="folder" color={focused ? 'rgb(0, 122, 255)' : 'grey'} />
          ),
        }}
      />
      <Screen
        name={ScreenName.SETTINGS}
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Icon style={styles.smallIcon} name="cog" color={focused ? 'rgb(0, 122, 255)' : 'grey'} />
          ),
        }}
      />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  reguralIcon: {
    width: 30,
    fontSize: 30,
  },
  smallIcon: {
    width: 35,
    fontSize: 35,
  },
});
