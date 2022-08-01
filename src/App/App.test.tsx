import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemingProvider } from '@theming';
import { App } from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
  },
  logger: {
    // eslint-disable-next-line no-console
    log: console.log,
    // eslint-disable-next-line no-console
    warn: console.warn,
    error: () => {},
  },
});

describe('Todo App', () => {
  test('renders correctly', async () => {
    const { getByTestId } = render(
      <ThemingProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemingProvider>,
    );

    const listElement = getByTestId('todo-list');
    expect(listElement).not.toBeNull();

    // HACK: let Jest clean up properly the re-render triggered by the async GraphQL request (addresses "An update to Todos inside a test was not wrapped in act(...)" warning)
    await waitFor(() => {});
  });
});
