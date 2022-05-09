import React from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import { StyleSheet, Text, Animated, LayoutAnimation } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { useDeleteTodo, useUpdateTodo } from '../Todos/hooks';
import { SwipeToAction } from '../../../components/SwipeToAction';

const useThemedStyles = (): {
  item: ViewStyle;
  taskHeader: TextStyle;
  task: TextStyle;
  strikeThrough: TextStyle;
} => {
  const { colors } = useTheme();

  return React.useMemo(
    () =>
      StyleSheet.create({
        item: {
          backgroundColor: colors.card,
          padding: 10,
          marginVertical: 6,
          marginHorizontal: 12,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: 8,
        },
        taskHeader: {
          color: colors.text,
          fontSize: 20,
          fontWeight: 'bold',
        },
        task: {
          color: colors.text,
          fontSize: 20,
        },
        strikeThrough: { textDecorationLine: 'line-through' },
      }),
    [colors],
  );
};

const TodoItem = ({
  data,
}: {
  data: { id: string; task: string; done: boolean } | undefined | null;
}): JSX.Element | null => {
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const styles = useThemedStyles();

  if (data == null) {
    return null;
  }

  const toggleItem = (): void => {
    updateTodo({ id: data.id, input: { done: !data.done } });
  };

  const deleteItem = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    deleteTodo({ id: data.id });
  };

  return (
    <SwipeToAction onSwiped={deleteItem}>
      <RectButton onPress={toggleItem}>
        <Animated.View style={[styles.item]}>
          <Text style={[styles.taskHeader, data.done && styles.strikeThrough]}>{`Lorem Ipsum #${data.id}`}</Text>
          <Text style={[styles.task, data.done && styles.strikeThrough]} numberOfLines={3}>
            {data.task}
          </Text>
        </Animated.View>
      </RectButton>
    </SwipeToAction>
  );
};

export { TodoItem };
