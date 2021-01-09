import React, { FC } from 'react';
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
          tabBarIcon: ({ focused }) => <Icon name="folder" size={30} color={focused ? 'rgb(0, 122, 255)' : 'grey'} />,
        }}
      />
      <Screen
        name={ScreenName.SETTINGS}
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused }) => <Icon name="cog" size={35} color={focused ? 'rgb(0, 122, 255)' : 'grey'} />,
        }}
      />
    </Navigator>
  );
};
