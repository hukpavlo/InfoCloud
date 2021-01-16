import { types } from 'mobx-state-tree';

const Folder = types.model({
  id: types.identifier,
  name: types.string,
  thumb: types.string,
});

export const FolderStore = types
  .model({
    folders: types.array(Folder),
  })
  .actions((self) => ({
    createFolder(name: string) {
      self.folders.push({
        name,
        id: Math.random().toString(),
        thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
      });
    },
  }));
