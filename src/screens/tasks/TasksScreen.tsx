import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TasksHomeScreen } from './TasksHomeScreen';
import { TasksNewScreen } from './TasksNewScreen';
import { useTailwind } from '../../theming';
import type { TasksStackParamList } from './types';

const TasksStack = createNativeStackNavigator<TasksStackParamList>();

const TasksScreen = (): JSX.Element => {
  const tw = useTailwind();

  return (
    <TasksStack.Navigator
      screenOptions={() => ({
        headerStyle: tw`bg-primary`,
        headerTitleStyle: tw`text-on-primary`,
      })}
    >
      <TasksStack.Screen name="TasksHome" component={TasksHomeScreen} options={{ headerTitle: 'Todo App' }} />
      {/* TODO: Fullscreen modal not supported properly in Android, see https://github.com/react-navigation/react-navigation/issues/10417 (can be done but need to introduce additional stack navigator, and would break encapsulation as the modal dialog would be available outside the "Tasks" feature) */}
      <TasksStack.Group screenOptions={{ presentation: 'modal' }}>
        <TasksStack.Screen name="TasksNew" component={TasksNewScreen} options={{ headerTitle: 'Add New Item' }} />
      </TasksStack.Group>
    </TasksStack.Navigator>
  );
};

export { TasksScreen };
