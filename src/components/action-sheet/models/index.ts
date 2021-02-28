export type ActionSheetRef = {
  hide: () => void;
  showWithOptions: (options: Omit<ActionSheetOptions, 'isVisible'>) => void;
};

export type ActionSheetOptions = {
  isVisible: boolean;
  hasPhotoFeed?: boolean;
  buttons: {
    title: string;
    keepOpen?: boolean;
    onPress: () => void;
  }[];
};
