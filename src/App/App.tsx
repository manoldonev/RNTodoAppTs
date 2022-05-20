import React from 'react';
import { Platform, UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDeviceContext } from 'twrnc';
import { useRefetchOnAppFocus, useRefetchOnReconnect } from './hooks';
import { TabNavigator } from '../navigation';
import { useTailwind } from '../theming';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = (): JSX.Element => {
  const tw = useTailwind();
  useDeviceContext(tw);

  useRefetchOnReconnect();
  useRefetchOnAppFocus();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export { App };
