import React, { FC } from 'react';
import Modal from 'react-native-modal';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from 'react-native';

import { PhotoFeed } from '../photo-feed';
import { PhotoActionSheetProps } from './photo-action-sheet.props';

export const PhotoActionSheet: FC<PhotoActionSheetProps> = ({ visible, hide }) => {
  const { width } = useWindowDimensions();

  const actionSheetWidth = width * 0.95;

  return (
    <Modal
      backdropOpacity={0.3}
      isVisible={visible}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}>
      <TouchableWithoutFeedback onPress={hide}>
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={(e) => e.preventDefault()}>
            <View style={[styles.mainContainer, { width: actionSheetWidth }]}>
              <PhotoFeed />
              <TouchableHighlight onPress={() => {}} underlayColor="#e5e5e5" style={styles.button}>
                <Text style={styles.buttonText}>Open Gallery</Text>
              </TouchableHighlight>
            </View>
          </TouchableWithoutFeedback>

          <TouchableHighlight
            onPress={hide}
            underlayColor="#e5e5e5"
            style={[styles.button, styles.cancelButton, { width: actionSheetWidth }]}>
            <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
          </TouchableHighlight>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mainContainer: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  cancelButton: {
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
