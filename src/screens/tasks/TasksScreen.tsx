// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import type { StatusBarStyle } from 'react-native';
import { Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { useActiveColorScheme, useTailwind } from '../../styling';
import { Todos } from './Todos';

const TasksScreen = (): JSX.Element => {
  const tw = useTailwind();
  const scheme = useActiveColorScheme();

  let barStyle: StatusBarStyle = 'default';
  if (Platform.OS === 'android') {
    barStyle = scheme === 'dark' ? 'dark-content' : 'light-content';
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={tw`flex-1 justify-center items-center bg-background`}>
      <FocusAwareStatusBar barStyle={barStyle} backgroundColor={tw.color('bg-primary')} />
      <Text style={tw`text-on-primary-container`}>Todo App</Text>
      <Todos />
    </SafeAreaView>
  );
};

export { TasksScreen };
