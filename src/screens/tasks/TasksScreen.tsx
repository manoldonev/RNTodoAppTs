// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Todos } from './Todos/Todos';

const TasksScreen = (): JSX.Element => {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Todo App</Text>
      <Todos />
    </SafeAreaView>
  );
};

export { TasksScreen };
