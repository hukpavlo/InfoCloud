import { createContext, useContext } from 'react';

import { PhotoStore } from './photo.store';
import { FolderStore } from './folder.store';

export class RootStore {
  photoStore = new PhotoStore();
  folderStore = new FolderStore();
}

export const rootStore = new RootStore();
export const RootStoreContext = createContext<RootStore>(null);

export const useStores = () => {
  const store = useContext(RootStoreContext);

  if (!store) {
    throw new Error('useStores must be used within a StoreProvider.');
  }

  return store;
};
