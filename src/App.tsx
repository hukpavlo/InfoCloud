import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ScreenName } from '@constants';
import { Home, Settings } from '@screens';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name={ScreenName.HOME}
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => <Icon name="home" size={30} color={focused ? 'grey' : 'lightgrey'} />,
            }}
          />
          <Tab.Screen
            name={ScreenName.SETTINGS}
            component={Settings}
            options={{
              tabBarIcon: ({ focused }) => <Icon name="cog" size={35} color={focused ? 'grey' : 'lightgrey'} />,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
