import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { ScreenName } from '@constants';
import { ModalsStack } from './modals.stack';

const { Navigator, Screen } = createStackNavigator();

export const RootStack: FC = () => (
  <NavigationContainer>
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen component={ModalsStack} name={ScreenName.MODALS_STACK} />
    </Navigator>
  </NavigationContainer>
);
