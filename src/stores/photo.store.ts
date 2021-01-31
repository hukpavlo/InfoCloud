import CameraRoll from '@react-native-community/cameraroll';
import { applySnapshot, flow, types } from 'mobx-state-tree';

export const PhotoStore = types
  .model({
    hasNextPage: true,
    photos: types.array(types.string),
    endCursor: types.maybe(types.string),
  })
  .actions((self) => ({
    getPhotos: flow(function* () {
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
