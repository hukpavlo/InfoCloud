import React from 'react';
import { StatusBar } from 'react-native';

import { Navigation } from '@components';

export const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </>
  );
};
