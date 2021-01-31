import React, { FC } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { HeaderButtonProps } from './header-button.props';

export const HeaderButton: FC<HeaderButtonProps> = ({
  title,
  onPress,
  disabled = false,
  color = 'rgb(0, 122, 255)',
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.4}
    style={styles.container}>
    <Text style={[styles.text, { color }, disabled && styles.disabled]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  text: {
    fontSize: 17,
    letterSpacing: 0.35,
  },
  disabled: {
    opacity: 0.4,
  },
});
