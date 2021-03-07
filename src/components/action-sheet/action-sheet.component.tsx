import Modal from 'react-native-modal';
import React, { FC, useImperativeHandle, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

import { useStores } from '@stores';
import { PhotoFeed } from './components';
import { actionSheetRef } from '@helpers';
import { ActionSheetOptions } from '@models';
import { ActionSheetProps } from './action-sheet.props';

export const ActionSheet: FC<ActionSheetProps> = () => {
  const { photoStore } = useStores();
  const { bottom, left, right } = useSafeAreaInsets();
  const [options, setOptions] = useState<ActionSheetOptions>(null);

  useImperativeHandle(
    actionSheetRef,
    () => ({
      showWithOptions(opts) {
        setOptions({ ...opts, isVisible: true });
      },
      hide() {
        hide();
      },
    }),
    [],
  );

  const onModalShow = () => {
    if (options?.isVisible && options?.hasPhotoFeed) {
      photoStore.getPhotos(true);
    }
  };

  const hide = () => setOptions(null);

  return (
    <Modal
      backdropOpacity={0.3}
      useNativeDriver={true}
      onBackdropPress={hide}
      onModalShow={onModalShow}
      isVisible={options?.isVisible}
      useNativeDriverForBackdrop={true}
      style={[
        styles.modal,
        {
          paddingLeft: left,
          paddingRight: right,
          paddingBottom: bottom,
        },
      ]}>
      <View style={styles.mainContainer}>
        {options?.hasPhotoFeed && <PhotoFeed />}
        {options?.buttons.map(({ title, onPress, isDestructive }, index) => (
          <TouchableHighlight
            key={index}
            onPress={onPress}
            style={[styles.button, styles.regularButton, !index && styles.firstRegularButton]}
            underlayColor="#e5e5e5">
            <Text style={[styles.buttonText, isDestructive && styles.destructiveButtonText]}>
              {title}
            </Text>
          </TouchableHighlight>
        ))}
      </View>

      <TouchableHighlight
        onPress={hide}
        underlayColor="#e5e5e5"
        style={[styles.button, styles.cancelButton]}>
        <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
      </TouchableHighlight>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mainContainer: {
    width: '95%',
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cancelButton: {
    width: '95%',
    marginTop: 10,
    borderRadius: 15,
  },
  button: {
    height: 55,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  regularButton: {
    borderTopWidth: 0.5,
    borderTopColor: '#cacaca',
  },
  firstRegularButton: {
    borderTopWidth: 0,
  },
  destructiveButtonText: {
    color: 'red',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'rgb(0, 122, 255)',
  },
  cancelButtonText: {
    fontWeight: '500',
  },
});
