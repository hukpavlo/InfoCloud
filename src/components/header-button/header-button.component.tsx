import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { HeaderButtonProps } from './header-button.props';

export const HeaderButton: FC<HeaderButtonProps> = ({ title, onPress, color = 'rgb(0, 122, 255)' }) => (
  <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.4}>
    <Text style={[styles.text, { color }]}>{title}</Text>
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
});
