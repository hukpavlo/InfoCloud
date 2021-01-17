import React, { FC } from 'react';
import { useWindowDimensions } from 'react-native';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';

import { Folder } from '@screens';
import { TopStack } from '../top';
import { ScreenName } from '@constants';
import { HeaderButton } from '@components';

export const FoldersStack: FC = () => {
  const { width } = useWindowDimensions();
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator initialRouteName={ScreenName.TOP_STACK}>
      <Screen
        component={TopStack}
        name={ScreenName.TOP_STACK}
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
      />

      <Screen
        component={Folder}
        name={ScreenName.FOLDER}
        options={{
          gestureResponseDistance: { horizontal: width },
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}
      />
    </Navigator>
  );
};
