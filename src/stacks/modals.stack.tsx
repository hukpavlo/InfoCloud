import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import { FolderCreate } from '@screens';
import { ScreenName } from '@constants';
import { MainStack } from './main.stack';
import { HeaderButton } from '@components';

const { Navigator, Screen } = createStackNavigator();

export const ModalsStack: FC = () => {
  const { height } = useWindowDimensions();

  return (
    <Navigator
      mode="modal"
      initialRouteName={ScreenName.MAIN_STACK}
      screenOptions={{ cardOverlayEnabled: true }}>
      <Screen component={MainStack} name={ScreenName.MAIN_STACK} options={{ headerShown: false }} />

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
  );
};
