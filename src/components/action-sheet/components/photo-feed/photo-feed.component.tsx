import { observer } from 'mobx-react-lite';
import { RNCamera } from 'react-native-camera';
import React, { useCallback, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  View,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  ListRenderItem,
  TouchableWithoutFeedback,
} from 'react-native';

import { useStores } from '@stores';
import { PhotoFeedProps } from './photo-feed.props';
import { toJS } from 'mobx';

export const PhotoFeed = observer<PhotoFeedProps>(() => {
  const { photoStore, folderStore } = useStores();

  useEffect(() => {}, [photoStore]);

  useEffect(() => {
    photoStore.reset();
    photoStore.getPhotos(true);
  }, [photoStore]);

  const keyExtractor = useCallback((_, index: number) => index.toString(), []);

  const renderItem = useCallback<ListRenderItem<string>>(
    ({ item }) => (
      <TouchableWithoutFeedback
        onPress={() => {
          console.log('#####');
          folderStore.getNewFolderThumb(item);
        }}>
        <Image style={styles.image} source={{ uri: item }} />
      </TouchableWithoutFeedback>
    ),
    [folderStore],
  );

  const onEndReached = useCallback(() => {
    photoStore.getPhotos();
  }, [photoStore]);

  const ListHeaderComponent = (
    <Pressable style={styles.cameraContainer} onPress={folderStore.getNewFolderThumbFromCamera}>
      <RNCamera
        captureAudio={false}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        notAuthorizedView={<View style={styles.camera} />}
        pendingAuthorizationView={<View style={styles.camera} />}
      />
      <Icon name="camera" size={50} color="#fff" style={styles.icon} />
    </Pressable>
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
