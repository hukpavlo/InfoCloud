import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { HeaderButton } from './header-button.component';

test('onPress and default color', () => {
  const title = 'title';
  const onPress = jest.fn();

  const { getByText } = render(<HeaderButton title={title} onPress={onPress} />);

  const buttonTitle = getByText(title);
  fireEvent.press(buttonTitle);

  expect(buttonTitle).toBeEnabled();
  expect(onPress).toBeCalledTimes(1);
  expect(buttonTitle).toHaveStyle({ color: 'rgb(0, 122, 255)' });
});

test('disabled and custom title color', () => {
  const color = 'red';
  const title = 'title';
  const onPress = jest.fn();

  const { getByText } = render(
    <HeaderButton title={title} color={color} disabled={true} onPress={onPress} />,
  );

  const buttonTitle = getByText(title);
  fireEvent.press(buttonTitle);

  expect(onPress).not.toBeCalled();
  expect(buttonTitle).toBeDisabled();
  expect(buttonTitle).toHaveStyle({ color });
});
