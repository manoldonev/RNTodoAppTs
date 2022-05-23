import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTailwind } from '@theming';
import { useTodos } from './query';
import { TodoItem } from '../TodoItem';

const Todos = (): JSX.Element => {
  const tw = useTailwind();
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const { data, loadMore, isLoading, isFetchingNextPage, isEmpty } = useTodos();

  if (isEmpty) {
    return (
      <View style={tw`justify-center items-center flex-1`}>
        <Icon name="sad-outline" size={96} color={tw.color('text-on-background')} />
        <Text style={tw`text-lg text-on-background`}>No items available</Text>
      </View>
    );
  }

  return (
    <FlatList
      testID="todo-list"
      ref={ref}
      data={data?.pages.map((page) => page.todos).flat()}
      keyExtractor={(item, index) => (item != null ? item.id : index.toString())}
      renderItem={({ item }) => <TodoItem data={item} />}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" style={tw`py-2.5`} /> : null}
      ListEmptyComponent={<ActivityIndicator size="large" />}
      contentContainerStyle={[isLoading && tw`justify-center flex-1`]}
      contentInsetAdjustmentBehavior="automatic"
      style={tw`w-full`}
    />
  );
};

export { Todos };
