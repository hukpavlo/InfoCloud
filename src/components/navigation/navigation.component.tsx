import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ScreenName } from '@constants';
import { Home, Settings } from '@screens';

export const Navigation: FC = () => {
  const BottomTab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <BottomTab.Navigator>
        <BottomTab.Screen
          component={Home}
          name={ScreenName.HOME}
          options={{
            tabBarIcon: ({ focused }) => <Icon name="home" size={30} color={focused ? 'grey' : 'lightgrey'} />,
          }}
        />
        <BottomTab.Screen
          name={ScreenName.SETTINGS}
          component={Settings}
          options={{
            tabBarIcon: ({ focused }) => <Icon name="cog" size={35} color={focused ? 'grey' : 'lightgrey'} />,
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};
