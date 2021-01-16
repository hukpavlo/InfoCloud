import { useNavigation } from '@react-navigation/native';
import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import { Alert, StatusBar, TextInput, SafeAreaView } from 'react-native';

import { HeaderButton, Input } from '@components';
import { ScreenName } from '@constants';

export const FolderCreate: FC = () => {
  const navigation = useNavigation();
  const ref = useRef<TextInput>(null);
  const [folderName, setFolderName] = useState('');

  const onSubmit = React.useCallback(() => {
    if (!folderName.trim()) {
      return Alert.alert('Empty folder name', 'Please enter a valid folder name.', [
        {
          text: 'OK',
          onPress: () => {
            setFolderName('');
            ref.current?.focus();
          },
        },
      ]);
    }

    navigation.navigate(ScreenName.FOLDER_LIST_ALL);
  }, [folderName, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton title="Save" disabled={!folderName.length} onPress={onSubmit} />,
    });
  }, [navigation, folderName, onSubmit]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <Input
        ref={ref}
        value={folderName}
        onSubmit={onSubmit}
        placeholder="Folder name"
        onChangeText={setFolderName}
        icon={{ name: 'folder-open', color: 'orange' }}
      />
    </SafeAreaView>
  );
};
