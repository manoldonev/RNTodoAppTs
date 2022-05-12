// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { useTodos } from './hooks';
import { TodoItem } from '../TodoItem';
import { useTailwind } from '../../../styling';

const Todos = (): JSX.Element => {
  const tw = useTailwind();
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const { data, loadMore, isLoading, isFetchingNextPage, isEmpty } = useTodos();

  if (isEmpty) {
    return (
      <View style={tw`flex-1 justify-center`}>
        <Text style={tw`text-lg text-center`}>No Data</Text>
      </View>
    );
  }

  return (
    <FlatList
      ref={ref}
      data={data?.pages.map((page) => page.todos).flat()}
      keyExtractor={(item, index) => (item != null ? item.id : index.toString())}
      renderItem={({ item }) => <TodoItem data={item} />}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" style={tw`py-2.5`} /> : null}
      ListEmptyComponent={<ActivityIndicator size="large" />}
      contentContainerStyle={[isLoading && tw`flex-1 justify-center`]}
    />
  );
};

export { Todos };
