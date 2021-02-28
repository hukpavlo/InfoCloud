import { Alert } from 'react-native';
import {
  check,
  request,
  RESULTS,
  Permission,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';

import { PermissionCheckResult } from '@constants';

const getDescription = (permission: Permission) => {
  switch (permission) {
    case PERMISSIONS.IOS.PHOTO_LIBRARY:
      return "InfoCloud needs access to your photo library so that you can send photos and videos.\n\nPlease go to your device's settings > Privacy > Photos and set InfoCloud to ON.";
    case PERMISSIONS.IOS.CAMERA:
      return "InfoCloud needs camera access so that you can take photos and videos.\n\nPlease go to your device's settings > Privacy > Camera and set InfoCloud to ON.";
  }
};

export const checkPermission = async (permission: Permission): Promise<PermissionCheckResult> => {
  const checkResult = await check(permission);

  switch (checkResult) {
    case RESULTS.UNAVAILABLE:
      Alert.alert('This feature is not available on this device');
      return PermissionCheckResult.FAILED;

    case RESULTS.BLOCKED:
      Alert.alert('Please Allow Access', getDescription(permission), [
        { text: 'Not Now', style: 'cancel' },
        { text: 'Settings', onPress: openSettings },
      ]);
      return PermissionCheckResult.FAILED;

    case RESULTS.LIMITED:
      return PermissionCheckResult.LIMITED;

    case RESULTS.GRANTED:
      return PermissionCheckResult.FAILED;

    case RESULTS.DENIED:
      const requestResult = await request(permission);

      if (requestResult === RESULTS.GRANTED) {
        return PermissionCheckResult.SUCCESS;
      }

      return PermissionCheckResult.FAILED;
  }
};
