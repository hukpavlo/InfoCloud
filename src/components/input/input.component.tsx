import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, TextInput, StyleSheet } from 'react-native';

import { useInputWidth } from './hooks';
import { InputProps } from './input.props';
import { ICON_PADDING, ICON_SIZE } from './constants';

export const Input = forwardRef<TextInput, InputProps>(({ placeholder, value, onChangeText, onSubmit, icon }, ref) => {
  const inputWidth = useInputWidth(ICON_SIZE + ICON_PADDING * 2);

  return (
    <View style={styles.container}>
      {icon && (
        <Icon
          name={icon.name}
          color={icon.color}
          style={StyleSheet.flatten([styles.icon, { padding: ICON_PADDING, fontSize: ICON_SIZE }])}
        />
      )}

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
        style={StyleSheet.flatten([styles.input, !icon && styles.noIconInput, { width: inputWidth }])}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 17,
    height: '100%',
    fontWeight: '500',
    backgroundColor: '#fff',
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
