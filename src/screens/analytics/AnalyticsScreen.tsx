import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar';
import { useActiveColorScheme, useTailwind } from '@theming';

const AnalyticsScreen = (): JSX.Element => {
  const tw = useTailwind();
  const scheme = useActiveColorScheme();

  return (
    <SafeAreaView style={tw`items-center justify-center flex-1 bg-background`}>
      <FocusAwareStatusBar
        barStyle={scheme === 'dark' ? 'dark-content' : 'light-content'}
        backgroundColor={tw.color('bg-primary')}
      />
      <Text style={tw`text-on-background`}>Analytics</Text>
    </SafeAreaView>
  );
};

export { AnalyticsScreen };
