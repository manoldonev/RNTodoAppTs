// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Switch, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { useActiveColorScheme, useAppColorScheme, useTailwind } from '../../styling';

const SettingsScreen = (): JSX.Element => {
  const tw = useTailwind();
  const preferredScheme = useColorScheme();
  const [appScheme, setAppScheme] = useAppColorScheme();
  const activeScheme = useActiveColorScheme();
  const isPreferredSchemeEnabled = appScheme == null;

  return (
    <SafeAreaView edges={['left', 'right']} style={tw`flex-1 bg-background`}>
      <FocusAwareStatusBar
        barStyle={activeScheme === 'dark' ? 'dark-content' : 'light-content'}
        backgroundColor={tw.color('bg-primary')}
      />
      <View
        style={tw`flex rounded-lg p-2 mx-2 my-3 flex-row justify-between bg-primary-container border border-outline`}
      >
        <Text style={tw`text-xl text-on-primary-container`}>Use device theme ({preferredScheme}):</Text>
        <Switch
          value={isPreferredSchemeEnabled}
          onValueChange={(newValue) => setAppScheme(newValue ? undefined : activeScheme)}
          trackColor={{ false: tw.color('bg-outline-variant'), true: tw.color('bg-outline-variant') }}
          thumbColor={tw.color('secondary')}
          ios_backgroundColor={tw.color('bg-outline-variant')}
        />
      </View>
      <View style={tw`flex rounded-lg p-2 mx-2 flex-row justify-between bg-primary-container border border-outline`}>
        <Text style={tw`text-xl text-on-primary-container`}>Dark theme:</Text>
        <Switch
          value={activeScheme === 'dark'}
          onValueChange={(newValue) => setAppScheme(newValue ? 'dark' : 'light')}
          disabled={isPreferredSchemeEnabled}
          trackColor={{ false: tw.color('bg-outline-variant'), true: tw.color('bg-outline-variant') }}
          thumbColor={tw.color('secondary')}
          ios_backgroundColor={tw.color('bg-outline-variant')}
        />
      </View>
    </SafeAreaView>
  );
};

export { SettingsScreen };
