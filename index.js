import React from 'react';
import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import { AppRegistry } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { App } from './src/App';
import { name as appName } from './app.json';
import { ThemingProvider } from './src/theming';
import { nativeServer as mswServer } from './src/mocks/msw/native';
import { API_MOCKING } from '@env';

const queryClient = new QueryClient();

const Main = () => {
  return (
    <ThemingProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemingProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);

if (API_MOCKING === 'enabled') {
  mswServer.listen({ onUnhandledRequest: 'bypass' });
}

export { Main };
