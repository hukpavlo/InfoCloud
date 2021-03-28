import { flow, makeAutoObservable } from 'mobx';
import CameraRoll from '@react-native-community/cameraroll';
import { openLimitedPhotoLibraryPicker, PERMISSIONS } from 'react-native-permissions';

import { PermissionCheckResult } from '@constants';
import { checkPermission, logger } from '@helpers';

export class PhotoStore {
  public photos: string[] = [];

  private hasNextPage = true;
  private endCursor: string | undefined;
  private readonly _PHOTOS_BATCH_SIZE = 25;

  constructor() {
    makeAutoObservable(this);
  }

  getPhotos = flow(function* (this: PhotoStore, shouldCheckPermission?: boolean) {
    logger.info('Trying to get photos');

    if (shouldCheckPermission) {
      const permissionCheckResult: PermissionCheckResult = yield checkPermission(
        PERMISSIONS.IOS.CAMERA,
      );

      if (permissionCheckResult === PermissionCheckResult.LIMITED) {
        openLimitedPhotoLibraryPicker();
      }

      if (permissionCheckResult === PermissionCheckResult.FAILED) {
        return;
      }
    }

    if (this.hasNextPage) {
      const newPhotos: CameraRoll.PhotoIdentifiersPage = yield CameraRoll.getPhotos({
        include: [],
        assetType: 'Photos',
        after: this.endCursor,
        first: this._PHOTOS_BATCH_SIZE,
      });

      this.endCursor = newPhotos.page_info.end_cursor;
      this.hasNextPage = newPhotos.page_info.has_next_page;
      this.photos.push(...newPhotos.edges.map(({ node }) => node.image.uri));
    }
  });

  reset = () => {
    this.photos = [];
    this.hasNextPage = true;
    this.endCursor = undefined;
  };
}
