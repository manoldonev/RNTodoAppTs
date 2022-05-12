// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { App } from './App';
import { TailwindProvider } from '../styling';

describe('Todo App', () => {
  test('renders correctly', async () => {
    const { getByText } = render(
      <TailwindProvider>
        <App />
      </TailwindProvider>,
    );

    const titleElement = getByText(/todo app/i);
    expect(titleElement).toBeTruthy();

    // HACK: let Jest clean up properly the re-render triggered by the async GraphQL request (addresses "An update to Todos inside a test was not wrapped in act(...)" warning)
    await waitFor(() => {});
  });
});
