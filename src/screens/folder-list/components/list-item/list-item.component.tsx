import React, { FC } from 'react';
import { useNavigation } from 'react-native-navigation-hooks';
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native';

import { NavigationService } from '@services';

export const ListItem: FC<any> = ({ name, thumb }) => {
  const { push } = useNavigation();

  const onPress = () => {
    push(NavigationService.getFolderScreenOptions(name));
  };

  return (
    <TouchableHighlight activeOpacity={0.9} underlayColor="#ddd" onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: thumb }} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 50,
  },
  info: {
    flexGrow: 1,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
  },
  name: {},
});
