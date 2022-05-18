import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type TasksStackParamList = {
  TasksHome: undefined;
  TasksNew: undefined;
};

export type TasksHomeProps = NativeStackScreenProps<TasksStackParamList, 'TasksHome'>;

export type TasksNewProps = NativeStackScreenProps<TasksStackParamList, 'TasksNew'>;
