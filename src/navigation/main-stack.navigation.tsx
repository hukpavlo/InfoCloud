import React, { FC } from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';

import { Folder } from '@screens';
import { ScreenName } from '@constants';
import { HeaderButton } from '@components';
import { BottomStack } from './bottom-stack.navigation';

export const MainStack: FC = () => {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator
      initialRouteName={ScreenName.BOTTOM_STACK}
      screenOptions={{
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
      }}>
      <Screen
        options={({ navigation }) => ({
          headerTitle: 'Folders',
          headerRight: () => (
            <HeaderButton
              title="Create"
              onPress={() => {
                navigation.navigate(ScreenName.FOLDER_CREATE_MODAL);
              }}
            />
          ),
        })}
        component={BottomStack}
        name={ScreenName.BOTTOM_STACK}
      />

      <Screen
        options={{
          gestureResponseDistance: {
            horizontal: Dimensions.get('screen').width,
          },
        }}
        name={ScreenName.FOLDER}
        component={Folder}
      />
    </Navigator>
  );
};
