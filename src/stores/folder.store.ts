import { DataStore } from '@aws-amplify/datastore';
import { flow, Instance, types } from 'mobx-state-tree';
import ImagePicker, { Image, PickerErrorCode } from 'react-native-image-crop-picker';

import { Folder } from '@datastore';
import { Alert } from 'react-native';

const FolderModel = types.model({
  name: types.string,
  thumb: types.string,
  id: types.identifier,
});

export const FolderStore = types
  .model({
    newFolderName: '',
    isPhotoActionSheetVisible: false,
    folders: types.array(FolderModel),
    activeFolder: types.safeReference(FolderModel),
    newFolderThumbPath: types.maybeNull(types.string),
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
      setNewFolderName: (newFolderName: string) => {
        self.newFolderName = newFolderName;
      },
      setActiveFolder: (folderId: string) => {
        self.activeFolder = self.folders.find((folder) => folder.id === folderId);
      },
      setIsPhotoActionSheetVisible: (isPhotoActionSheetVisible: boolean) => {
        self.isPhotoActionSheetVisible = isPhotoActionSheetVisible;
      },
      createFolder: flow(function* () {
        const newFolder: Folder = yield DataStore.save(
          new Folder({
            name: self.newFolderName,
            thumb: self.newFolderThumbPath,
          }),
        );

        self.newFolderName = '';
        self.newFolderThumbPath = null;
        self.folders.push(parseFolder(newFolder));
      }),
      getNewFolderThumb: flow<void, [string]>(function* (path) {
        try {
          const image: Image = yield ImagePicker.openCropper({
            path,
            width: 50,
            height: 50,
            cropping: true,
            mediaType: 'photo',
            cropperCircleOverlay: true,
          });

          self.newFolderThumbPath = image.path;
          self.isPhotoActionSheetVisible = false;
        } catch (err) {
          if ((err.code as PickerErrorCode) === 'E_PICKER_CANCELLED') {
            return;
          }

          Alert.alert('Something went wrong');
        }
      }),
      getNewFolderThumbFromCamera: flow(function* () {
        try {
          const image: Image = yield ImagePicker.openCamera({
            width: 50,
            height: 50,
            cropping: true,
            mediaType: 'photo',
            cropperCircleOverlay: true,
          });

          self.newFolderThumbPath = image.path;
          self.isPhotoActionSheetVisible = false;
        } catch (err) {
          if ((err.code as PickerErrorCode) === 'E_PICKER_CANCELLED') {
            return;
          }

          Alert.alert('Something went wrong');
        }
      }),
      getNewFolderThumbFromGallery: flow(function* () {
        try {
          const image: Image = yield ImagePicker.openPicker({
            width: 50,
            height: 50,
            cropping: true,
            mediaType: 'photo',
            cropperCircleOverlay: true,
          });

          self.newFolderThumbPath = image.path;
          self.isPhotoActionSheetVisible = false;
        } catch (err) {
          if ((err.code as PickerErrorCode) === 'E_PICKER_CANCELLED') {
            return;
          }

          Alert.alert('Something went wrong');
        }
      }),
    };
  });
