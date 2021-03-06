export type ActionSheetOptions = {
  isVisible: boolean;
  hasPhotoFeed?: boolean;
  buttons: ActionSheetButton[];
};

export interface ActionSheetRef {
  hide: () => void;
  showWithOptions: (options: Omit<ActionSheetOptions, 'isVisible'>) => void;
}

export type ActionSheetButton = {
  title: string;
  onPress: () => void;
};
