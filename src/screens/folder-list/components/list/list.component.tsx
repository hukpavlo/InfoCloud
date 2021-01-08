import React, { FC } from 'react';
import { FlatList } from 'react-native';

import { ListItem } from '../list-item';

const folders = [
  {
    id: '1',
    name: 'Folder 1',
    thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  },
  {
    id: '2',
    name: 'Folder 2',
    thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  },
  {
    id: '3',
    name: 'Folder 3',
    thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  },
  {
    id: '4',
    name: 'Folder 4',
    thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  },
  {
    id: '5',
    name: 'Folder 5',
    thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  },
  {
    id: '6',
    name: 'Folder 6',
    thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  },
  {
    id: '7',
    name: 'Folder 7',
    thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  },
  {
    id: '8',
    name: 'Folder 8',
    thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  },
  {
    id: '9',
    name: 'Folder 9',
    thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  },
  {
    id: '10',
    name: 'Folder 10',
    thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  },
  {
    id: '11',
    name: 'Folder 11',
    thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  },
  {
    id: '12',
    name: 'Folder 12',
    thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  },
  {
    id: '13',
    name: 'Folder 13',
    thumb: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg',
  },
];

export const List: FC = () => {
  return <FlatList data={folders} keyExtractor={({ id }) => id} renderItem={({ item }) => <ListItem {...item} />} />;
};
