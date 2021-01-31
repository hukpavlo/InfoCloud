import { Instance, types } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import { PhotoStore } from './photo.store';
import { FolderStore } from './folder.store';

const RootStore = types.model({
  photoStore: PhotoStore,
  folderStore: FolderStore,
});

export const rootStore = RootStore.create({
  photoStore: {},
  folderStore: {},
});

export const RootStoreContext = createContext<Instance<typeof RootStore>>(rootStore);

export const useStores = () => {
  const store = useContext(RootStoreContext);

  if (!store) {
    throw new Error('useStores must be used within a StoreProvider.');
  }

  return store;
};
