import React, { useEffect } from 'react';
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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (Platform.OS === 'android') {
      // HACK: hide the tabBar of the parent navigator to mimic a fullscreen modal in Android (iOS supports this out-of-the-box)
      navigation.getParent()?.setOptions({ tabBarStyle: tw`hidden` });

      // HACK: we need to restore the tabBar of the parent navigator upon closing the modal, however, at this point we lost the original tabBarStyle value -- make sure to reflect any changes to tabBarStyle here in the root TabNavigator as well
      return () => navigation.getParent()?.setOptions({ tabBarStyle: tw`bg-primary` });
    }
  });

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={tw`flex-1 bg-background`}>
      <FocusAwareStatusBar
        barStyle={scheme === 'dark' ? 'dark-content' : 'light-content'}
        backgroundColor={tw.color('bg-primary')}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`items-center justify-center flex-1 p-6`}
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
                style={tw`w-full h-12 px-3 text-lg border rounded-md border-outline bg-primary-container text-on-primary-container`}
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
              style={tw`w-full px-3 mt-4 text-lg border rounded-md ios:h-32 border-outline bg-primary-container text-on-primary-container`}
              keyboardAppearance={scheme}
            />
          )}
        />
        {(touchedFields.note != null || touchedFields.title == null) && errors.note != null && (
          <Text style={tw`text-sm text-error`}>{errors.note.message}</Text>
        )}

        <View style={tw`flex-row justify-around w-full mt-4`}>
          <Button
            mode="contained"
            style={tw`w-24 bg-primary`}
            labelStyle={tw`text-on-primary`}
            onPress={handleSubmit(onSubmit)}
          >
            Save
          </Button>
          <Button
            style={tw`w-24 bg-transparent border border-primary`}
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
