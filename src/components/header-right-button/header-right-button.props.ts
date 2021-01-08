import { GestureResponderEvent } from 'react-native';

export type HeaderRightButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};
