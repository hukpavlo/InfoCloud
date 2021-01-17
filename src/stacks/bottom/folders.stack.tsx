import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { TopStack } from '../top';
import { ScreenName } from '@constants';
import { HeaderButton } from '@components';

export const FoldersStack: FC = () => {
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
    </Navigator>
  );
};
