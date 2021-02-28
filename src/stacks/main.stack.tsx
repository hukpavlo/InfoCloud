import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';

import { Folder } from '@screens';
import { BottomStack } from './bottom';
import { ScreenName } from '@constants';
import { HeaderButton } from '@components';

const { Navigator, Screen } = createStackNavigator();

export const MainStack: FC = () => {
  const { width } = useWindowDimensions();

  return (
    <Navigator initialRouteName={ScreenName.BOTTOM_STACK}>
      <Screen
        component={BottomStack}
        name={ScreenName.BOTTOM_STACK}
        options={({ navigation, route }) => {
          switch (getFocusedRouteNameFromRoute(route)) {
            case ScreenName.SETTINGS_STACK:
              return {
                headerTitle: 'Settings',
              };

            case ScreenName.FOLDERS_STACK:
            default:
              return {
                headerTitle: 'Folders',
                headerRight: () => (
                  <HeaderButton
                    title="Create"
                    onPress={() => {
                      navigation.navigate(ScreenName.FOLDER_CREATE_MODAL);
                    }}
                  />
                ),
              };
          }
        }}
      />

      <Screen
        component={Folder}
        name={ScreenName.FOLDER}
        options={{
          headerBackTitle: 'Folders',
          gestureResponseDistance: { horizontal: width },
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}
      />
    </Navigator>
  );
};
