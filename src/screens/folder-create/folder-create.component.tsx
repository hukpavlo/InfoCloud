import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StatusBar, TextInput } from 'react-native';
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { ScreenName } from '@constants';
import { HeaderButton, Input } from '@components';

export const FolderCreate: FC = () => {
  const navigation = useNavigation();
  const inputRef = useRef<TextInput>(null);
  const [folderName, setFolderName] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          title="Save"
          disabled={true}
          onPress={() => navigation.navigate(ScreenName.FOLDER_CREATE_MODAL)}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" />
      <Input
        ref={inputRef}
        value={folderName}
        onChange={setFolderName}
        placeholder="Folder name"
        icon={{ name: 'folder-open', color: 'orange' }}
      />
    </SafeAreaView>
  );
};
