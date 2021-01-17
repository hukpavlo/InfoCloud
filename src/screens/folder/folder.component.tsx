import { Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useStores } from '@stores';

export const Folder = observer(() => {
  const navigation = useNavigation();
  const { folderStore } = useStores();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: folderStore.activeFolder?.name,
    });
  }, [navigation, folderStore]);

  return <Text>Folder</Text>;
});
