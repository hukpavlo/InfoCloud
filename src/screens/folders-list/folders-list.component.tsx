import { toJS } from 'mobx';
import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { FlatList, ListRenderItem, SafeAreaView, StyleSheet } from 'react-native';

import { Folder } from '@datastore';
import { useStores } from '@stores';
import { ListItem } from './components';

export const FoldersList = observer(() => {
  const { folderStore } = useStores();

  const keyExtractor = useCallback((item: Folder) => item.id, []);

  const renderItem = useCallback<ListRenderItem<Folder>>(({ item }) => <ListItem {...item} />, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data={toJS(folderStore.folders)}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
