import { DataStore } from 'aws-amplify';
import { Alert, StatusBar } from 'react-native';
import { flow, makeAutoObservable } from 'mobx';
import { PERMISSIONS } from 'react-native-permissions';
import ImagePicker, { Image, PickerErrorCode } from 'react-native-image-crop-picker';

import { Folder } from '@datastore';
import { PermissionCheckResult } from '@constants';
import { ActionSheetHelper, checkPermission, logger } from '@helpers';

export class FolderStore {
  public newFolderName = '';
  public folders: Folder[] = [];
  public activeFolder: Folder | null = null;
  public newFolderThumbPath: string | null = null;

  private readonly _THUMBNAIL_SIZE = 50;

  constructor() {
    makeAutoObservable(this);
  }

  setNewFolderName = (newFolderName: string) => {
    this.newFolderName = newFolderName;
  };

  setActiveFolder = (folderId: string) => {
    const activeFolder = this.folders.find((folder) => folder.id === folderId);

    if (activeFolder) {
      this.activeFolder = activeFolder;
    }
  };

  removeNewFolderThumb = () => {
    ActionSheetHelper.hide();
    this.newFolderThumbPath = null;
  };

  afterCreate = flow(function* (this: FolderStore) {
    const folders: Folder[] = yield DataStore.query(Folder);
    this.folders = folders;
  });

  createFolder = flow(function* (this: FolderStore) {
    const newFolder: Folder = yield DataStore.save(
      new Folder({
        name: this.newFolderName,
      }),
    );

    this.newFolderName = '';
    this.newFolderThumbPath = null;
    this.folders.push(newFolder);
  });

  getNewFolderThumb = flow(function* (this: FolderStore, path: string) {
    try {
      const image: Image = yield ImagePicker.openCropper({
        path,
        cropping: false,
        mediaType: 'photo',
        cropperCircleOverlay: true,
        width: this._THUMBNAIL_SIZE,
        height: this._THUMBNAIL_SIZE,
      });

      ActionSheetHelper.hide();
      this.newFolderThumbPath = image.path;
    } catch (err) {
      const errCode: PickerErrorCode = err.code;

      if (errCode === 'E_PICKER_CANCELLED') {
        return;
      }

      logger.error(err);

      Alert.alert('Something went wrong');
    }
  });

  getNewFolderThumbFromCamera = flow(function* (this: FolderStore) {
    try {
      const permissionCheckResult: PermissionCheckResult = yield checkPermission(
        PERMISSIONS.IOS.CAMERA,
      );

      if (permissionCheckResult === PermissionCheckResult.FAILED) {
        return;
      }

      const { path }: Image = yield ImagePicker.openCamera({
        cropping: false,
        mediaType: 'photo',
        cropperCircleOverlay: true,
        width: this._THUMBNAIL_SIZE,
        height: this._THUMBNAIL_SIZE,
      });

      ActionSheetHelper.hide();
      this.newFolderThumbPath = path;
    } catch (err) {
      const errCode: PickerErrorCode = err.code;

      if (errCode === 'E_PICKER_CANCELLED') {
        return;
      }

      Alert.alert('Something went wrong');
    }
  });

  getNewFolderThumbFromGallery = flow(function* (this: FolderStore) {
    try {
      StatusBar.setBarStyle('dark-content', true);

      const permissionCheckResult: PermissionCheckResult = yield checkPermission(
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      );

      if (permissionCheckResult === PermissionCheckResult.FAILED) {
        return;
      }

      const { path }: Image = yield ImagePicker.openPicker({
        cropping: false,
        mediaType: 'photo',
        cropperCircleOverlay: true,
        width: this._THUMBNAIL_SIZE,
        height: this._THUMBNAIL_SIZE,
      });

      ActionSheetHelper.hide();
      this.newFolderThumbPath = path;
    } catch (err) {
      const errCode: PickerErrorCode = err.code;

      if (errCode === 'E_PICKER_CANCELLED') {
        return;
      }

      console.error(err);
      Alert.alert('Something went wrong');
    }
  });
}
