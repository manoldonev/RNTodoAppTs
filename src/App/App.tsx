// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, UIManager, useColorScheme } from 'react-native';
import { useRefetchOnAppFocus, useRefetchOnReconnect } from './hooks';
import { TabNavigator } from '../navigation';
import { DarkTheme, LightTheme } from '../theming';

const queryClient = new QueryClient();

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = (): JSX.Element => {
  const scheme = useColorScheme();
  useRefetchOnReconnect();
  useRefetchOnAppFocus();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
            <TabNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export { App };
