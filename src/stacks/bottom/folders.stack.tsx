import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { TopStack } from '../top';
import { ScreenName } from '@constants';

const { Navigator, Screen } = createStackNavigator();

export const FoldersStack: FC = () => {
  return (
    <Navigator initialRouteName={ScreenName.TOP_STACK} screenOptions={{ headerShown: false }}>
      <Screen component={TopStack} name={ScreenName.TOP_STACK} />
    </Navigator>
  );
};
