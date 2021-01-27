import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { TopStack } from '../top';
import { ScreenName } from '@constants';
import { HeaderButton } from '@components';

export const FoldersStack: FC = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator initialRouteName={ScreenName.TOP_STACK} screenOptions={{ headerShown: false }}>
      <Screen component={TopStack} name={ScreenName.TOP_STACK} />
    </Navigator>
  );
};
