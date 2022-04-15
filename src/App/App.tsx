// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, useColorScheme } from 'react-native';

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>Todo App</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export { App };
