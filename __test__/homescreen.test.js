import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

const mockNavigation = { navigate: jest.fn() };

test('renders correctly', () => {
  const { toJSON } = render(<HomeScreen navigation={mockNavigation} />);
  expect(toJSON()).toMatchSnapshot();
});
