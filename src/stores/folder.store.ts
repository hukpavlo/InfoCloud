import { Alert, StatusBar } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { PERMISSIONS } from 'react-native-permissions';
import { flow, Instance, types } from 'mobx-state-tree';
import ImagePicker, { Image, PickerErrorCode } from 'react-native-image-crop-picker';

import { Folder } from '@datastore';
import { PermissionCheckResult } from '@constants';
import { ActionSheetHelper, checkPermission } from '@helpers';

const FolderModel = types.model({
  name: types.string,
  thumb: types.string,
  id: types.identifier,
});

export const FolderStore = types
  .model({
    newFolderName: '',
    folders: types.array(FolderModel),
    activeFolder: types.safeReference(FolderModel),
    newFolderThumbPath: types.maybeNull(types.string),
  })
  .actions((self) => {
    const THUMBNAIL_SIZE = 50;

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
      removeNewFolderThumb: () => {
        ActionSheetHelper.hide();
        self.newFolderThumbPath = null;
      },
      getNewFolderThumb: flow<void, [string]>(function* (path) {
        try {
          const image: Image = yield ImagePicker.openCropper({
            path,
            cropping: true,
            mediaType: 'photo',
            width: THUMBNAIL_SIZE,
            height: THUMBNAIL_SIZE,
            cropperCircleOverlay: true,
          });

          ActionSheetHelper.hide();
          self.newFolderThumbPath = image.path;
        } catch (err) {
          const errCode: PickerErrorCode = err.code;

          if (errCode === 'E_PICKER_CANCELLED') {
            return;
          }

          Alert.alert('Something went wrong');
        }
      }),
      getNewFolderThumbFromCamera: flow(function* () {
        try {
          const permissionCheckResult: PermissionCheckResult = yield checkPermission(
            PERMISSIONS.IOS.CAMERA,
          );

          if (permissionCheckResult === PermissionCheckResult.FAILED) {
            return;
          }

          const { path }: Image = yield ImagePicker.openCamera({
            cropping: true,
            mediaType: 'photo',
            width: THUMBNAIL_SIZE,
            height: THUMBNAIL_SIZE,
            cropperCircleOverlay: true,
          });

          ActionSheetHelper.hide();
          self.newFolderThumbPath = path;
        } catch (err) {
          const errCode: PickerErrorCode = err.code;

          if (errCode === 'E_PICKER_CANCELLED') {
            return;
          }

          Alert.alert('Something went wrong');
        }
      }),
      getNewFolderThumbFromGallery: flow(function* () {
        try {
          StatusBar.setBarStyle('dark-content', true);

          const permissionCheckResult: PermissionCheckResult = yield checkPermission(
            PERMISSIONS.IOS.PHOTO_LIBRARY,
          );

          if (permissionCheckResult === PermissionCheckResult.FAILED) {
            return;
          }

          const { path }: Image = yield ImagePicker.openPicker({
            cropping: true,
            mediaType: 'photo',
            width: THUMBNAIL_SIZE,
            height: THUMBNAIL_SIZE,
            cropperCircleOverlay: true,
          });

          ActionSheetHelper.hide();
          self.newFolderThumbPath = path;
        } catch (err) {
          const errCode: PickerErrorCode = err.code;

          if (errCode === 'E_PICKER_CANCELLED') {
            return;
          }

          console.error(err);
          Alert.alert('Something went wrong');
        }
      }),
    };
  });
