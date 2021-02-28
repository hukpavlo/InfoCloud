import { observer } from 'mobx-react-lite';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useCallback, useLayoutEffect, useRef } from 'react';
import {
  View,
  Alert,
  Image,
  Pressable,
  StatusBar,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { useStores } from '@stores';
import { useInputWidth } from '@hooks';
import { ScreenName } from '@constants';
import { HeaderButton } from '@components';
import { PhotoActionSheet } from './components';
import {
  PHOTO_PADDING,
  CAMERA_ICON_SIZE,
  FOLDER_THUMB_WIDTH,
  PHOTO_CONTAINER_PADDING,
  INPUT_LEFT_COMPONENT_WIDTH,
} from './constants';

export const FolderCreate = observer(() => {
  const navigation = useNavigation();
  const { folderStore } = useStores();
  const inputRef = useRef<TextInput>(null);
  const inputWidth = useInputWidth(INPUT_LEFT_COMPONENT_WIDTH);

  const onSubmit = useCallback(() => {
    const trimmedName = folderStore.newFolderName.trim();

    if (!trimmedName) {
      return Alert.alert('Empty folder name', 'Please enter a valid folder name.', [
        {
          text: 'OK',
          onPress: () => {
            inputRef.current?.focus();
            folderStore.setNewFolderName('');
          },
        },
      ]);
    }

    folderStore.createFolder();

    navigation.navigate(ScreenName.FOLDERS_LIST_ALL);
  }, [navigation, folderStore]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          title="Save"
          onPress={onSubmit}
          disabled={!folderStore.newFolderName.length}
        />
      ),
    });
  }, [navigation, onSubmit, folderStore.newFolderName]);

  const openPhotoActionSheet = () => {
    folderStore.setIsPhotoActionSheetVisible(true);
  };

  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Pressable style={styles.photoContainer} onPress={openPhotoActionSheet}>
          {folderStore.newFolderThumbPath ? (
            <View style={styles.thumbContainer}>
              <Image source={{ uri: folderStore.newFolderThumbPath }} style={styles.thumb} />
            </View>
          ) : (
            <View style={styles.photo}>
              <Icon name="camera" size={CAMERA_ICON_SIZE} color="rgb(0, 122, 255)" />
            </View>
          )}
        </Pressable>

        <TextInput
          ref={inputRef}
          autoFocus={true}
          returnKeyType="done"
          autoCapitalize="none"
          clearButtonMode="always"
          placeholder="Folder name"
          onSubmitEditing={onSubmit}
          placeholderTextColor="#cacaca"
          value={folderStore.newFolderName}
          onChangeText={folderStore.setNewFolderName}
          style={[styles.input, { width: inputWidth }]}
        />
      </SafeAreaView>
      <PhotoActionSheet />
    </Fragment>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  photoContainer: {
    backgroundColor: '#fff',
    padding: PHOTO_CONTAINER_PADDING,
  },
  photo: {
    padding: PHOTO_PADDING,
    backgroundColor: '#e5f1fd',
    borderRadius: CAMERA_ICON_SIZE,
  },
  input: {
    flexGrow: 1,
    fontSize: 17,
    height: '100%',
    paddingLeft: 10,
    fontWeight: '500',
    backgroundColor: '#fff',
  },
  thumbContainer: {
    overflow: 'hidden',
    width: FOLDER_THUMB_WIDTH,
    borderRadius: FOLDER_THUMB_WIDTH,
  },
  thumb: {
    width: '100%',
    aspectRatio: 1,
  },
});
