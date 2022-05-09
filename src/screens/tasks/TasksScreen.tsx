// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Todos } from './Todos';

const TasksScreen = (): JSX.Element => {
  const { colors } = useTheme();

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colors.text }}>Todo App</Text>
      <Todos />
    </SafeAreaView>
  );
};

export { TasksScreen };
