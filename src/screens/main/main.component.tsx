import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ScreenName } from '@constants';
import { FolderList, Settings } from '@screens';

export const Main: FC = () => {
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        component={FolderList}
        name={ScreenName.FOLDER_LIST}
        options={{
          title: 'Folders',
          tabBarIcon: ({ focused }) => <Icon name="folder" size={30} color={focused ? 'grey' : 'lightgrey'} />,
        }}
      />
      <BottomTab.Screen
        name={ScreenName.SETTINGS}
        component={Settings}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <Icon name="cog" size={35} color={focused ? 'grey' : 'lightgrey'} />,
        }}
      />
    </BottomTab.Navigator>
  );
};
