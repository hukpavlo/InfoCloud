import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useCallback, useEffect, useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, Image, FlatList, StyleSheet, ListRenderItem } from 'react-native';

import { useStores } from '@stores';
import { PhotoFeedProps } from './photo-feed.props';

export const PhotoFeed = observer<PhotoFeedProps>(() => {
  const { photoStore, folderStore } = useStores();

  useEffect(() => {
    photoStore.reset();
  }, [photoStore]);

  const keyExtractor = useCallback((_, index: number) => index.toString(), []);

  const renderItem = useCallback<ListRenderItem<string>>(
    ({ item }) => (
      <TouchableWithoutFeedback onPress={() => folderStore.getNewFolderThumb(item)}>
        <Image style={styles.image} source={{ uri: item }} />
      </TouchableWithoutFeedback>
    ),
    [folderStore],
  );

  const onEndReached = useCallback(() => {
    photoStore.getPhotos();
  }, [photoStore]);

  const onCameraPress = useCallback(() => folderStore.getNewFolderThumbFromCamera(), [folderStore]);

  const ListHeaderComponent = useMemo(
    () => (
      <TouchableWithoutFeedback style={styles.cameraContainer} onPress={onCameraPress}>
        <RNCamera
          captureAudio={false}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          notAuthorizedView={<View style={styles.camera} />}
          pendingAuthorizationView={<View style={styles.camera} />}
        />
        <Icon name="camera" size={50} color="#fff" style={styles.icon} />
      </TouchableWithoutFeedback>
    ),
    [onCameraPress],
  );

  return (
    <FlatList
      horizontal={true}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      data={toJS(photoStore.photos)}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
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
    backgroundColor: 'black',
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
    borderRadius: 10,
  },
});
