import React, { FC } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

import { ButtonId } from '@constants';
import { useNavigation, useNavigationButtonPress } from 'react-native-navigation-hooks';

export const FolderCreate: FC = () => {
  const { dismissModal } = useNavigation();

  useNavigationButtonPress(
    () => {
      dismissModal();
    },
    { buttonId: ButtonId.FOLDER_CREATE_CANCEL },
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Create Folder screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: '#000',
  },
});
