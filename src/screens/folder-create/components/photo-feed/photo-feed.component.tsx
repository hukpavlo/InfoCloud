import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import CameraRoll from '@react-native-community/cameraroll';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { FlatList, Image, ListRenderItem, StyleSheet, View } from 'react-native';

import { PhotoFeedProps } from './photo-feed.props';

export const PhotoFeed: FC<PhotoFeedProps> = () => {
  const [photos, setPhotos] = useState<CameraRoll.PhotoIdentifiersPage>({
    edges: [],
    page_info: null,
  });

  useEffect(() => {
    const getPhotos = async () => {
      setPhotos(await CameraRoll.getPhotos({ first: 10 }));
    };

    getPhotos();
  }, []);

  const keyExtractor = useCallback((_, index: number) => index.toString(), []);

  const renderItem = useCallback<ListRenderItem<CameraRoll.PhotoIdentifiersPage['edges'][number]>>(
    ({ item, index }) => {
      return index ? (
        <Image key={index} style={styles.image} source={{ uri: item.node.image.uri }} />
      ) : (
        <View style={styles.cameraContainer}>
          <RNCamera
            style={styles.camera}
            captureAudio={false}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
          />
          <Icon name="camera" size={50} color="#fff" style={styles.icon} />
        </View>
      );
    },
    [],
  );

  return (
    <FlatList
      horizontal={true}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      data={[null, ...photos.edges]}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  icon: {
    zIndex: 100,
    position: 'absolute',
  },
  cameraContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
    borderRadius: 10,
  },
});
