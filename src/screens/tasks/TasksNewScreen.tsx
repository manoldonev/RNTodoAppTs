import React from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { useActiveColorScheme, useTailwind } from '../../theming';
import { useCreateTodo } from './Todos/hooks';
import type { TasksNewProps } from './types';

const validationSchema = yup.object().shape(
  {
    title: yup
      .string()
      .trim()
      .max(20, 'Must be 20 characters or less')
      .when('note', {
        is: (note?: string) => note == null || note.length === 0,
        then: yup.string().required('At least one of the fields is required.'),
      }),
    note: yup
      .string()
      .trim()
      .max(20000, 'Must be 20000 characters or less')
      .when('title', {
        is: (title?: string) => title == null || title.length === 0,
        then: yup.string().required('At least one of the fields is required.'),
      }),
  },
  [['title', 'note']],
);
interface Inputs {
  title: string;
  note: string;
}

const TasksNewScreen = ({ navigation }: TasksNewProps): JSX.Element => {
  const tw = useTailwind();
  const scheme = useActiveColorScheme();
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

  const { mutate: createTodo } = useCreateTodo();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // TODO: extend db schema with real 'title' field
    // TODO: user management (auth)
    createTodo({ input: { task: data.note || data.title, done: false, user_id: '1' } });
    navigation.goBack();
  };

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
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Title"
                placeholderTextColor={tw.color('text-outline')}
                style={tw`rounded-md border border-outline h-12 w-full px-3 bg-primary-container text-on-primary-container text-lg`}
                clearButtonMode="while-editing"
                keyboardAppearance={scheme}
              />
            );
          }}
        />
        {(touchedFields.title != null || touchedFields.note == null) && errors.title != null && (
          <Text style={tw`text-sm text-error`}>{errors.title.message}</Text>
        )}

        <Controller
          name="note"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={20000}
              placeholder="Note"
              placeholderTextColor={tw.color('text-outline')}
              style={tw`mt-4 rounded-md border border-outline w-full px-3 bg-primary-container text-on-primary-container text-lg ios:h-32`}
              keyboardAppearance={scheme}
            />
          )}
        />
        {(touchedFields.note != null || touchedFields.title == null) && errors.note != null && (
          <Text style={tw`text-sm text-error`}>{errors.note.message}</Text>
        )}

        <View style={tw`w-full mt-4 flex-row justify-around`}>
          <Button
            mode="contained"
            style={tw`bg-primary w-24`}
            labelStyle={tw`text-on-primary`}
            onPress={handleSubmit(onSubmit)}
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
