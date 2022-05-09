// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </SafeAreaView>
  );
};

export { SettingsScreen };
