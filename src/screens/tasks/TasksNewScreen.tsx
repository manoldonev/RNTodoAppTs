// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { useActiveColorScheme, useTailwind } from '../../theming';
import { useCreateTodo } from './Todos/hooks';
import type { TasksNewProps } from './types';

const TasksNewScreen = ({ navigation }: TasksNewProps): JSX.Element => {
  const tw = useTailwind();
  const scheme = useActiveColorScheme();
  const { mutate: createTodo } = useCreateTodo();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={tw`flex-1`}>
      <FocusAwareStatusBar
        barStyle={scheme === 'dark' ? 'dark-content' : 'light-content'}
        backgroundColor={tw.color('bg-primary')}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1 justify-center items-center bg-surface p-6`}
      >
        <TextInput
          value={title}
          onChangeText={(newTitle) => setTitle(newTitle)}
          placeholder="Title"
          placeholderTextColor={tw.color('text-outline')}
          style={tw`rounded-md border border-outline h-12 w-full px-3 bg-primary-container text-on-primary-container text-lg`}
          clearButtonMode="while-editing"
          keyboardAppearance={scheme}
        />
        <TextInput
          value={note}
          onChangeText={(newNote) => setNote(newNote)}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={200}
          placeholder="Note"
          placeholderTextColor={tw.color('text-outline')}
          style={tw`my-4 rounded-md border border-outline w-full px-3 bg-primary-container text-on-primary-container text-lg ios:h-32`}
          keyboardAppearance={scheme}
        />
        <View style={tw`w-full flex-row justify-around`}>
          <Button
            mode="contained"
            style={tw`bg-primary w-24`}
            labelStyle={tw`text-on-primary`}
            onPress={() => {
              createTodo({ input: { task: note || title, done: false, user_id: '1' } });
              navigation.goBack();
            }}
          >
            Save
          </Button>
          <Button
            style={tw`bg-transparent border border-primary w-24`}
            labelStyle={tw`text-primary`}
            onPress={() => navigation.goBack()}
          >
            Cancel
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export { TasksNewScreen };
