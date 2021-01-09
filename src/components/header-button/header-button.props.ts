import { GestureResponderEvent } from 'react-native';

export type HeaderButtonProps = {
  title: string;
  color?: string;
  onPress: (event: GestureResponderEvent) => void;
};
