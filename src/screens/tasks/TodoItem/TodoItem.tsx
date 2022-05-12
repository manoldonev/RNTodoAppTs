// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Text, Animated, LayoutAnimation } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useDeleteTodo, useUpdateTodo } from '../Todos/hooks';
import { SwipeToAction } from '../../../components/SwipeToAction';
import { useTailwind } from '../../../styling';

const TodoItem = ({
  data,
}: {
  data: { id: string; task: string; done: boolean } | undefined | null;
}): JSX.Element | null => {
  const tw = useTailwind();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

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
        <Animated.View style={tw`bg-primary-container border rounded-lg border-outline my-1.5 mx-3 p-2.5`}>
          <Text
            style={[tw`text-on-primary-container text-lg font-bold`, data.done && tw`line-through`]}
          >{`Lorem Ipsum #${data.id}`}</Text>
          <Text style={[tw`text-on-primary-container`, data.done && tw`line-through`]} numberOfLines={3}>
            {data.task}
          </Text>
        </Animated.View>
      </RectButton>
    </SwipeToAction>
  );
};

export { TodoItem };
