import { GestureResponderEvent } from 'react-native';

export type HeaderButtonProps = {
  title: string;
  color?: string;
  disabled?: boolean;
  onPress: (event: GestureResponderEvent) => void;
};
