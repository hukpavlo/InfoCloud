import 'react-native-gesture-handler';

import React from 'react';
import Amplify from 'aws-amplify';
import { StatusBar } from 'react-native';
import { withAuthenticator } from 'aws-amplify-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootStack } from '@stacks';
import awsconfig from '../aws-exports';
import { RootStoreContext, rootStore } from '@stores';

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

export const App = withAuthenticator(
  () => (
    <SafeAreaProvider>
      <RootStoreContext.Provider value={rootStore}>
        <StatusBar barStyle="dark-content" />
        <RootStack />
      </RootStoreContext.Provider>
    </SafeAreaProvider>
  ),
  {
    usernameAttributes: 'email',
    signUpConfig: {
      hideAllDefaults: true,
      signUpFields: [
        {
          label: 'Email',
          key: 'username',
          required: true,
          displayOrder: 1,
          type: 'string',
          placeholder: 'Enter your email',
        },
        {
          label: 'Password',
          key: 'password',
          required: true,
          displayOrder: 2,
          type: 'password',
          placeholder: 'Enter your password',
        },
      ],
    },
  },
);
