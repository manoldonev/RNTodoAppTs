// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { StyleSheet, Text, Animated, useWindowDimensions, LayoutAnimation } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDeleteTodo, useUpdateTodo } from './hooks';

type RenderActionFunction = (
  progress: Animated.AnimatedInterpolation,
  dragX: Animated.AnimatedInterpolation,
) => JSX.Element;

const renderUnderlay = (screenWidth: number, position: 'left' | 'right' = 'left'): RenderActionFunction => {
  return (_progress: Animated.AnimatedInterpolation, dragX: Animated.AnimatedInterpolation): JSX.Element => {
    const width = screenWidth / 2;
    // eslint-disable-next-line react/destructuring-assignment
    const scale = dragX.interpolate({
      inputRange: position === 'left' ? [0, width] : [-width, 0],
      outputRange: position === 'left' ? [0.5, 1] : [1, 0.5],
      extrapolate: 'clamp',
    });

    const alignItems = position === 'left' ? 'flex-start' : 'flex-end';
    const margin = position === 'left' ? { marginLeft: 20 } : { marginRight: 20 };

    return (
      <Animated.View style={[styles.underlayContainer, { alignItems }]}>
        <Animated.View style={{ transform: [{ scale }], ...margin }}>
          <Icon name="trash-outline" size={32} color="white" />
        </Animated.View>
      </Animated.View>
    );
  };
};

const TodoItem = ({
  data,
}: {
  data: { id: string; task: string; done: boolean } | undefined | null;
}): JSX.Element | null => {
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();
  const { width: screenWidth } = useWindowDimensions();

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
    <Swipeable
      renderLeftActions={renderUnderlay(screenWidth)}
      renderRightActions={renderUnderlay(screenWidth, 'right')}
      rightThreshold={screenWidth / 4}
      leftThreshold={screenWidth / 4}
      onSwipeableOpen={deleteItem}
    >
      <RectButton onPress={toggleItem}>
        <Animated.View style={[styles.item]}>
          <Text style={[styles.taskHeader, data.done && styles.strikeThrough]}>{`Lorem Ipsum #${data.id}`}</Text>
          <Text style={[styles.task, data.done && styles.strikeThrough]} numberOfLines={3}>
            {data.task}
          </Text>
        </Animated.View>
      </RectButton>
    </Swipeable>
  );
};

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
  taskHeader: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  task: {
    fontSize: 20,
    color: '#000000',
  },
  strikeThrough: { textDecorationLine: 'line-through' },
  underlayContainer: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
  },
});

export { TodoItem };
