import React from 'react';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { TailwindProvider } from './src/styling';

const Main = () => {
  return (
    <TailwindProvider>
      <App />
    </TailwindProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);

export { Main };
