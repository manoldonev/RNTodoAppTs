// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnalyticsScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Analytics</Text>
    </SafeAreaView>
  );
};

export { AnalyticsScreen };
