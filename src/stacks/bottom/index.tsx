import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ScreenName } from '@constants';
import { FoldersStack } from './folders.stack';
import { SettingsStack } from './settings.stack';

const { Navigator, Screen } = createBottomTabNavigator();

export const BottomStack: FC = () => {
  return (
    <Navigator
      initialRouteName={ScreenName.FOLDERS_STACK}
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
        component={FoldersStack}
        name={ScreenName.FOLDERS_STACK}
        options={({ route }) => ({
          tabBarLabel: 'Folders',
          tabBarVisible: getFocusedRouteNameFromRoute(route) !== ScreenName.FOLDER,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="folder"
              style={styles.reguralIcon}
              color={focused ? 'rgb(0, 122, 255)' : 'grey'}
            />
          ),
        })}
      />
      <Screen
        component={SettingsStack}
        name={ScreenName.SETTINGS_STACK}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Icon
              name="cog"
              style={styles.smallIcon}
              color={focused ? 'rgb(0, 122, 255)' : 'grey'}
            />
          ),
        }}
      />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  reguralIcon: {
    width: 30,
    height: 30,
    fontSize: 30,
  },
  smallIcon: {
    width: 35,
    height: 35,
    fontSize: 35,
  },
});
