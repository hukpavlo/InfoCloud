import React, { FC } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { FoldersList } from '@screens';
import { ScreenName } from '@constants';

const { Navigator, Screen } = createMaterialTopTabNavigator();

export const TopStack: FC = () => {
  return (
    <Navigator
      tabBarOptions={{
        scrollEnabled: true,
        labelStyle: { textTransform: 'none' },
      }}>
      <Screen
        component={FoldersList}
        options={{ title: 'All Folders' }}
        name={ScreenName.FOLDERS_LIST_ALL}
      />
    </Navigator>
  );
};
