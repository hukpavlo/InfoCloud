import React, { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native';

import { ScreenName } from '@constants';
import { useStores } from '@stores';

export const ListItem = memo<any>(({ name, thumb, id }) => {
  const navigation = useNavigation();
  const { folderStore } = useStores();

  const onPress = () => {
    folderStore.setActiveFolder(id);
    navigation.navigate(ScreenName.FOLDER);
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
});

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
