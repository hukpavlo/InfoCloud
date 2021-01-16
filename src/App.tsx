import 'react-native-gesture-handler';

import React from 'react';
import Amplify from 'aws-amplify';
import { StatusBar } from 'react-native';

import awsconfig from '../aws-exports';
import { RootStack } from '@navigation';
import { RootStoreContext, rootStore } from '@stores';

Amplify.configure(awsconfig);

export const App = () => {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <StatusBar barStyle="dark-content" />
      <RootStack />
    </RootStoreContext.Provider>
  );
};
