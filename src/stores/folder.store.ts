import { flow, types } from 'mobx-state-tree';
import { DataStore } from '@aws-amplify/datastore';

import { Folder } from '@models';

const FolderModel = types.model({
  id: types.identifier,
  name: types.string,
  thumb: types.string,
});

export const FolderStore = types
  .model({
    folders: types.array(FolderModel),
  })
  .actions((self) => ({
    createFolder: flow(function* (name: string) {
      yield DataStore.save(
        new Folder({
          name,
        }),
      );

      self.folders.push({
        name,
        id: Math.random().toString(),
        thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
      });
    }),
  }));
