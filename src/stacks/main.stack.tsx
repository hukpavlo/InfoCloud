import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { Folder } from '@screens';
import { BottomStack } from './bottom';
import { ScreenName } from '@constants';

export const MainStack: FC = () => {
  const { width } = useWindowDimensions();
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator initialRouteName={ScreenName.MAIN_STACK}>
      <Screen name={ScreenName.MAIN_STACK} component={BottomStack} options={{ headerShown: false }} />

      <Screen
        component={Folder}
        name={ScreenName.FOLDER}
        options={{
          headerBackTitle: 'Folders',
          gestureResponseDistance: { horizontal: width },
        }}
      />
    </Navigator>
  );
};
