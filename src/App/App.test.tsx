// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render } from '@testing-library/react-native';

import { App } from './App';

describe('Todo App', () => {
  test('renders correctly', () => {
    const { getByText } = render(<App />);

    const titleElement = getByText(/todo app/i);
    expect(titleElement).not.toBeNull();
  });
});
