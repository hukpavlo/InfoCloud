import React, { FC, useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';

import { ScreenName } from '@constants';
import { Folder, Main } from '@screens';
import { HeaderRightButton } from '../header-right-button';

export const Navigation: FC = () => {
  const Stack = createStackNavigator();
  const navigation = useRef<NavigationContainerRef>(null);

  return (
    <NavigationContainer ref={navigation}>
      <Stack.Navigator
        screenOptions={{
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}>
        <Stack.Screen
          options={{
            headerTitle: 'Folders',
            headerRight: () => <HeaderRightButton title="Create" onPress={() => {}} />,
          }}
          component={Main}
          name={ScreenName.MAIN}
        />

        <Stack.Screen name={ScreenName.FOLDER} component={Folder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
