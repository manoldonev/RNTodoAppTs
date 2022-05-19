import React from 'react';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { ThemingProvider } from './src/theming';

const Main = () => {
  return (
    <ThemingProvider>
      <App />
    </ThemingProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);

export { Main };
