import { Instance, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import { FolderStore } from './folder.store';

const RootStore = types.model({
  folderStore: FolderStore,
});

export const rootStore = RootStore.create({
  folderStore: FolderStore.create(),
});

export const RootStoreContext = createContext<Instance<typeof RootStore>>(rootStore);

export const useStores = () => {
  const store = useContext(RootStoreContext);

  if (!store) {
    throw new Error('useStores must be used within a StoreProvider.');
  }

  return store;
};
