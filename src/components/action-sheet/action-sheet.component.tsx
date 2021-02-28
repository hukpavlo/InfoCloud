import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { createRef, useImperativeHandle, useState } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

import { PhotoFeed } from './components';
import { ActionSheetProps } from './action-sheet.props';
import { ActionSheetOptions, ActionSheetRef } from './models';

const actionSheetRef = createRef<ActionSheetRef>();

export const ActionSheet: ActionSheetProps = () => {
  const { bottom, left, right } = useSafeAreaInsets();
  const [options, setOptions] = useState<ActionSheetOptions>(null);

  useImperativeHandle<ActionSheetRef, ActionSheetRef>(
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

  const hide = () => setOptions(null);

  return (
    <Modal
      backdropOpacity={0.3}
      useNativeDriver={true}
      onBackdropPress={hide}
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
        {options?.buttons.map(({ title, onPress, keepOpen }, index) => (
          <TouchableHighlight
            key={index}
            style={styles.button}
            underlayColor="#e5e5e5"
            onPress={() => {
              console.log('!!!!!!!!!!!!!!!');
              onPress();
              !keepOpen && hide();
            }}>
            <Text style={styles.buttonText}>{title}</Text>
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

ActionSheet.showWithOptions = (options) => {
  actionSheetRef.current?.showWithOptions(options);
};

ActionSheet.hide = () => {
  actionSheetRef.current?.hide();
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
  buttonText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'rgb(0, 122, 255)',
  },
  cancelButtonText: {
    fontWeight: '500',
  },
});
