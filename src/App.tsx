import 'react-native-gesture-handler';

import React from 'react';
import Amplify from 'aws-amplify';
import { StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import awsconfig from '../aws-exports';
import { RootStack } from '@components';

Amplify.configure(awsconfig);

EStyleSheet.build({
  $rem: 10,
  $primary: 'rgb(0, 122, 255)',
});

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <RootStack />
    </>
  );
};
