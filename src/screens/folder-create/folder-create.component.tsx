import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import React, { FC, Fragment, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Alert,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import { useStores } from '@stores';
import { useInputWidth } from '@hooks';
import { ScreenName } from '@constants';
import { HeaderButton } from '@components';
import { PhotoActionSheet } from './components';
import {
  PHOTO_PADDING,
  CAMERA_ICON_SIZE,
  PHOTO_CONTAINER_PADDING,
  INPUT_LEFT_COMPONENT_WIDTH,
} from './constants';

export const FolderCreate: FC = () => {
  const navigation = useNavigation();
  const { folderStore } = useStores();
  const inputRef = useRef<TextInput>(null);
  const [folderName, setFolderName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const inputWidth = useInputWidth(INPUT_LEFT_COMPONENT_WIDTH);

  const onSubmit = React.useCallback(() => {
    if (!folderName.trim()) {
      return Alert.alert('Empty folder name', 'Please enter a valid folder name.', [
        {
          text: 'OK',
          onPress: () => {
            setFolderName('');
            inputRef.current?.focus();
          },
        },
      ]);
    }

    folderStore.createFolder(folderName);

    navigation.navigate(ScreenName.FOLDERS_LIST_ALL);
  }, [folderName, navigation, folderStore]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton title="Save" disabled={!folderName.length} onPress={onSubmit} />
      ),
    });
  }, [navigation, folderName, onSubmit]);

  return (
    <Fragment>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(true)}>
          <View style={styles.photoContainer}>
            <View style={styles.photo}>
              <Icon name="camera" size={CAMERA_ICON_SIZE} color="rgb(0, 122, 255)" />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TextInput
          ref={inputRef}
          autoFocus={true}
          value={folderName}
          returnKeyType="done"
          autoCapitalize="none"
          clearButtonMode="always"
          placeholder="Folder name"
          onSubmitEditing={onSubmit}
          onChangeText={setFolderName}
          style={[styles.input, { width: inputWidth }]}
        />
      </View>
      <PhotoActionSheet visible={isModalVisible} hide={() => setIsModalVisible(false)} />
    </Fragment>
  );
};

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
});
