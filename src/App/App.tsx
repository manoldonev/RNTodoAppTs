// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { SafeAreaView, StatusBar, Text, useColorScheme, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Todos } from '../Todos/Todos';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={{ height: '100%' }}>
          <Text>Todo App</Text>
          <Todos />
        </View>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export { App };
