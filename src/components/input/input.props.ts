import { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';

export type InputProps = {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  icon?: { name: string; color?: string };
  onSubmit?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
};
