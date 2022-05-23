import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FocusAwareStatusBar } from '@components/FocusAwareStatusBar';
import { useActiveColorScheme, useTailwind } from '@theming';
import { Todos } from './Todos';
import type { TasksHomeProps } from './types';
import { useSearchBar } from './hooks';

const TasksHomeScreen = ({ navigation }: TasksHomeProps): JSX.Element => {
  const tw = useTailwind();
  const activeScheme = useActiveColorScheme();

  useSearchBar(navigation);

  return (
    <SafeAreaView edges={['left', 'right']} style={tw`items-center justify-center flex-1 bg-background`}>
      <FocusAwareStatusBar
        barStyle={activeScheme === 'dark' ? 'dark-content' : 'light-content'}
        backgroundColor={tw.color('bg-primary')}
      />
      <Todos />
      <FAB
        style={tw`absolute bottom-0 right-0 m-5 bg-secondary`}
        small={false}
        icon={() => <Icon color={tw.color('on-secondary')} name="add-outline" size={24} />}
        onPress={() => navigation.navigate('TasksNew')}
      />
    </SafeAreaView>
  );
};

export { TasksHomeScreen };
