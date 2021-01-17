import React from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { useStores } from '@stores';
import { ListItem } from './components';

export const FoldersList = observer(() => {
  const { folderStore } = useStores();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={({ id }) => id}
        data={toJS(folderStore.folders)}
        renderItem={({ item }) => <ListItem {...item} />}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
