import CameraRoll from '@react-native-community/cameraroll';
import { applySnapshot, flow, types } from 'mobx-state-tree';
import { openLimitedPhotoLibraryPicker, PERMISSIONS } from 'react-native-permissions';

import { checkPermission } from '@helpers';
import { PermissionCheckResult } from '@constants';

export const PhotoStore = types
  .model({
    hasNextPage: true,
    photos: types.array(types.string),
    endCursor: types.maybe(types.string),
  })
  .actions((self) => ({
    getPhotos: flow<void, [boolean?]>(function* (shouldCheckPermission) {
      if (shouldCheckPermission) {
        const permissionCheckResult: PermissionCheckResult = yield checkPermission(
          PERMISSIONS.IOS.CAMERA,
        );

        if (permissionCheckResult === PermissionCheckResult.LIMITED) {
          openLimitedPhotoLibraryPicker();
        }
      }

      if (self.hasNextPage) {
        const newPhotos: CameraRoll.PhotoIdentifiersPage = yield CameraRoll.getPhotos({
          first: 10,
          include: [],
          assetType: 'Photos',
          after: self.endCursor,
        });

        self.endCursor = newPhotos.page_info.end_cursor;
        self.hasNextPage = newPhotos.page_info.has_next_page;
        self.photos.push(...newPhotos.edges.map(({ node }) => node.image.uri));
      }
    }),
    reset: () => {
      applySnapshot(self, {});
    },
  }));
