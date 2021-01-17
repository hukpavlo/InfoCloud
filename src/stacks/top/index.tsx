import React, { FC } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { FoldersList } from '@screens';
import { ScreenName } from '@constants';

export const TopStack: FC = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator tabBarOptions={{ scrollEnabled: true }}>
      <Tab.Screen options={{ title: 'All' }} name={ScreenName.FOLDERS_LIST_ALL} component={FoldersList} />
    </Tab.Navigator>
  );
};
