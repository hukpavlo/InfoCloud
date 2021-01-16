import React, { FC } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { List } from './components';
import { ScreenName } from '@constants';

export const FolderList: FC = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator tabBarOptions={{ scrollEnabled: true }}>
      <Tab.Screen options={{ title: 'All' }} name={ScreenName.FOLDER_LIST_ALL} component={List} />
    </Tab.Navigator>
  );
};
