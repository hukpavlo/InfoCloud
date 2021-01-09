import React from 'react';
import { StatusBar } from 'react-native';

import { RootStack } from '@components';

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <RootStack />
    </>
  );
};
