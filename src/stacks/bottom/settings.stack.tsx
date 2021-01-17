import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Settings } from '@screens';
import { ScreenName } from '@constants';

export const SettingsStack: FC = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator initialRouteName={ScreenName.SETTINGS}>
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
