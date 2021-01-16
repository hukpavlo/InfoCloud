import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, TextInput, StyleSheet } from 'react-native';

import { InputProps } from './input.props';

export const Input = forwardRef<TextInput, InputProps>(({ placeholder, value, onChangeText, onSubmit, icon }, ref) => (
  <View style={styles.container}>
    {icon && <Icon style={styles.icon} name={icon.name} size={30} color={icon.color} />}

    <TextInput
      ref={ref}
      value={value}
      autoFocus={true}
      returnKeyType="done"
      autoCapitalize="none"
      clearButtonMode="always"
      placeholder={placeholder}
      onSubmitEditing={onSubmit}
      onChangeText={onChangeText}
      style={StyleSheet.flatten([styles.input, !icon && styles.noIconInput])}
    />
  </View>
));

const styles = EStyleSheet.create({
  $iconWidth: 50,
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  icon: {
    padding: 10,
    fontSize: '3rem',
  },
  input: {
    fontWeight: '500',
    fontSize: '1.7rem',
    width: '100% - $iconWidth',
  },
  noIconInput: {
    padding: 15,
  },
  clearWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  clear: {
    padding: 12,
    paddingRight: 8,
    color: 'lightgrey',
  },
  invisibleClear: {
    opacity: 0,
  },
});