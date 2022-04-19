// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUpdateTodo } from './hooks/useUpdateTodo';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#E0F3FF',
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 12,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 8,
  },
  task: {
    fontSize: 20,
  },
  strikeThrough: { textDecorationLine: 'line-through' },
});

const TodoItem = ({
  data,
}: {
  data: { id: string; task: string; done: boolean } | undefined | null;
}): JSX.Element | null => {
  const { mutate: updateTodo } = useUpdateTodo();

  if (data == null) {
    return null;
  }

  const toggleItem = (): void => {
    updateTodo({ id: data.id, input: { done: !data.done } });
  };

  return (
    <TouchableOpacity onPress={toggleItem}>
      <View style={styles.item}>
        <Text style={[data.done && styles.strikeThrough]}>{`Lorem Ipsum #${data.id}`}</Text>
        <Text style={[styles.task, data.done && styles.strikeThrough]} numberOfLines={3}>
          {data.task}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export { TodoItem };
