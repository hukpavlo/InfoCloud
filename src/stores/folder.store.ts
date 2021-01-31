import { DataStore } from '@aws-amplify/datastore';
import { flow, Instance, types } from 'mobx-state-tree';

import { Folder } from '@datastore';

const FolderModel = types.model({
  name: types.string,
  thumb: types.string,
  id: types.identifier,
});

export const FolderStore = types
  .model({
    folders: types.array(FolderModel),
    activeFolder: types.safeReference(FolderModel),
  })
  .actions((self) => {
    const parseFolder = ({ id, name, thumb }: Folder): Instance<typeof FolderModel> => ({
      id,
      name,
      thumb,
    });

    return {
      afterCreate: flow(function* () {
        const folders: Folder[] = yield DataStore.query(Folder);

        self.folders.replace(folders.map(parseFolder));
      }),
      createFolder: flow(function* (name: string) {
        const newFolder: Folder = yield DataStore.save(
          new Folder({
            name,
            thumb:
              'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
          }),
        );

        self.folders.push(parseFolder(newFolder));
      }),
      setActiveFolder: (folderId: string) => {
        self.activeFolder = self.folders.find((folder) => folder.id === folderId);
      },
    };
  });
