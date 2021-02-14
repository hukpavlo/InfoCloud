import { Alert } from 'react-native';
import {
  check,
  request,
  RESULTS,
  Permission,
  PERMISSIONS,
  openSettings,
  openLimitedPhotoLibraryPicker,
} from 'react-native-permissions';

const getDescription = (permission: Permission) => {
  switch (permission) {
    case PERMISSIONS.IOS.PHOTO_LIBRARY:
      return "InfoCloud needs access to your photo library so that you can send photos and videos.\n\nPlease go to your device's settings > Privacy > Photos and set InfoCloud to ON.";
    case PERMISSIONS.IOS.CAMERA:
      return "InfoCloud needs camera access so that you can take photos and videos.\n\nPlease go to your device's settings > Privacy > Camera and set InfoCloud to ON.";
  }
};

export const checkPermission = async (permission: Permission): Promise<boolean> => {
  const checkResult = await check(permission);

  switch (checkResult) {
    case RESULTS.UNAVAILABLE:
      Alert.alert('This feature is not available on this device');
      return false;

    case RESULTS.BLOCKED:
      Alert.alert('Please Allow Access', getDescription(permission), [
        { text: 'Not Now', style: 'cancel' },
        { text: 'Settings', onPress: openSettings },
      ]);
      return false;

    case RESULTS.LIMITED:
      //TODO new screen for photos picker
      await openLimitedPhotoLibraryPicker();
      return true;
    case RESULTS.GRANTED:
      return true;

    case RESULTS.DENIED:
      const requestResult = await request(permission);

      if (requestResult === RESULTS.GRANTED) {
        return true;
      }

      return false;
  }
};
