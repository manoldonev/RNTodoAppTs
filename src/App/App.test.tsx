import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { App } from './App';
import { ThemingProvider } from '../theming';

describe('Todo App', () => {
  test('renders correctly', async () => {
    const { getByTestId } = render(
      <ThemingProvider>
        <App />
      </ThemingProvider>,
    );

    const listElement = getByTestId('todo-list');
    expect(listElement).not.toBeNull();

    // HACK: let Jest clean up properly the re-render triggered by the async GraphQL request (addresses "An update to Todos inside a test was not wrapped in act(...)" warning)
    await waitFor(() => {});
  });
});
