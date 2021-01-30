import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Settings } from '@screens';
import { ScreenName } from '@constants';

const { Navigator, Screen } = createStackNavigator();

export const SettingsStack: FC = () => {
  return (
    <Navigator initialRouteName={ScreenName.SETTINGS} screenOptions={{ headerShown: false }}>
      <Screen
        component={Settings}
        name={ScreenName.SETTINGS}
        options={{
          title: 'Settings',
        }}
      />
    </Navigator>
  );
};
