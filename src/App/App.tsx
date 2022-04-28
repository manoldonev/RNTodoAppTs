// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { SafeAreaView, StatusBar, Text, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Todos } from '../Todos/Todos';
import { useRefetchOnAppFocus, useRefetchOnReconnect } from './hooks';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  useRefetchOnReconnect();
  useRefetchOnAppFocus();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <QueryClientProvider client={queryClient}>
          <View style={{ height: '100%' }}>
            <Text>Todo App</Text>
            <Todos />
          </View>
        </QueryClientProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export { App };
