import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useInputWidth = (iconWidth = 0): number => {
  const { width } = useWindowDimensions();
  const { left, right } = useSafeAreaInsets();

  return width - iconWidth - left - right;
};
