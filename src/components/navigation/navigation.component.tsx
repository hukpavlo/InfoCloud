import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ScreenName } from '@constants';
import { Folder, Main } from '@screens';
import { createStackNavigator } from '@react-navigation/stack';

export const Navigation: FC = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            title: 'Folders',
          }}
          component={Main}
          name={ScreenName.MAIN}
        />

        <Stack.Screen name={ScreenName.FOLDER} component={Folder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
