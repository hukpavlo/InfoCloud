import React, { FC } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

import { HeaderRightButtonProps } from './header-right-button.props';

export const HeaderRightButton: FC<HeaderRightButtonProps> = ({ title, onPress }) => (
  <TouchableHighlight style={styles.container} onPress={onPress} activeOpacity={0.5} underlayColor="#fff">
    <Text style={styles.text}>{title}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    marginRight: 8,
  },
  text: {
    fontSize: 17,
    letterSpacing: 0.35,
    color: 'rgb(0, 122, 255)',
  },
});
