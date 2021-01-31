import React, { FC } from 'react';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

import { PhotoFeed } from '../photo-feed';
import { PhotoActionSheetProps } from './photo-action-sheet.props';

export const PhotoActionSheet: FC<PhotoActionSheetProps> = ({ visible, hide }) => {
  const { bottom, left, right } = useSafeAreaInsets();

  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.3}
      useNativeDriver={true}
      onBackdropPress={hide}
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
        <PhotoFeed />
        <TouchableHighlight onPress={() => {}} underlayColor="#e5e5e5" style={styles.button}>
          <Text style={styles.buttonText}>Open Gallery</Text>
        </TouchableHighlight>
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
  buttonText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'rgb(0, 122, 255)',
  },
  cancelButtonText: {
    fontWeight: '500',
  },
});
