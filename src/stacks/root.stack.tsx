import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { ScreenName } from '@constants';
import { FolderCreate } from '@screens';
import { MainStack } from './main.stack';
import { HeaderButton } from '@components';

export const RootStack: FC = () => {
  const { height } = useWindowDimensions();
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator
        mode="modal"
        initialRouteName={ScreenName.MAIN_STACK}
        screenOptions={{ cardOverlayEnabled: true }}>
        <Screen
          component={MainStack}
          name={ScreenName.MAIN_STACK}
          options={{ headerShown: false }}
        />

        <Screen
          component={FolderCreate}
          name={ScreenName.FOLDER_CREATE_MODAL}
          options={({ navigation }) => ({
            headerStatusBarHeight: 0,
            headerTitle: 'New Folder',
            headerStyle: { height: 60 },
            headerLeft: () => <HeaderButton title="Cancel" onPress={() => navigation.pop()} />,
            gestureResponseDistance: {
              vertical: height,
            },
            ...TransitionPresets.ModalPresentationIOS,
          })}
        />
      </Navigator>
    </NavigationContainer>
  );
};
