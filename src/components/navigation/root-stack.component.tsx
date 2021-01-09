import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { ScreenName } from '@constants';
import { FolderCreate } from '@screens';
import { HeaderButton } from '../header-button';
import { MainStack } from './main-stack.component';

export const RootStack: FC = () => {
  const { height } = useWindowDimensions();
  const { Navigator, Screen } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator initialRouteName={ScreenName.MAIN_STACK} screenOptions={{ cardOverlayEnabled: true }} mode="modal">
        <Screen name={ScreenName.MAIN_STACK} component={MainStack} options={{ headerShown: false }} />
        <Screen
          component={FolderCreate}
          name={ScreenName.FOLDER_CREATE_MODAL}
          options={({ navigation }) => ({
            headerTitle: 'New Folder',
            headerStatusBarHeight: 0,
            headerStyle: {
              height: 60,
            },
            headerLeft: () => <HeaderButton title="Cancel" onPress={() => navigation.pop()} />,
            headerRight: () => (
              <HeaderButton title="Save" onPress={() => navigation.navigate(ScreenName.FOLDER_CREATE_MODAL)} />
            ),
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
