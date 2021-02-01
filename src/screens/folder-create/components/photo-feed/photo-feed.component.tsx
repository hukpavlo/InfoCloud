import { observer } from 'mobx-react-lite';
import { RNCamera } from 'react-native-camera';
import React, { useCallback, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList, Image, ListRenderItem, StyleSheet, View } from 'react-native';

import { useStores } from '@stores';
import { PhotoFeedProps } from './photo-feed.props';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export const PhotoFeed = observer<PhotoFeedProps>(() => {
  const { photoStore, folderStore } = useStores();

  useEffect(() => {
    photoStore.reset();
    photoStore.getPhotos();
  }, [photoStore]);

  const keyExtractor = useCallback((_, index: number) => index.toString(), []);

  const renderItem = useCallback<ListRenderItem<string>>(
    ({ item, index }) => {
      return index ? (
        <TouchableWithoutFeedback onPress={() => folderStore.getNewFolderThumb(item)}>
          <Image style={styles.image} source={{ uri: item }} />
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback onPress={() => folderStore.getNewFolderThumbFromCamera()}>
          <View style={styles.cameraContainer}>
            <RNCamera
              captureAudio={false}
              style={styles.camera}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.on}
            />
            <Icon name="camera" size={50} color="#fff" style={styles.icon} />
          </View>
        </TouchableWithoutFeedback>
      );
    },
    [folderStore],
  );

  return (
    <FlatList
      horizontal={true}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      data={[null, ...photoStore.photos]}
      onEndReached={photoStore.getPhotos}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
});

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
