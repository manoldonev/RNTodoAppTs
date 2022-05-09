// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { useTodos } from './hooks';
import { TodoItem } from './TodoItem';

const Todos = (): JSX.Element => {
  const { data, loadMore, isLoading, isFetchingNextPage } = useTodos();
  const isEmpty = !isLoading && (data == null || data.pages.length === 0 || data.pages[0].todos?.length === 0);
  const ref = React.useRef(null);

  useScrollToTop(ref);

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <Text style={styles.noData}>No Data</Text>
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
      ListFooterComponent={
        isFetchingNextPage ? <ActivityIndicator size="large" style={{ paddingVertical: 10 }} /> : null
      }
      ListEmptyComponent={<ActivityIndicator size="large" />}
      contentContainerStyle={isLoading && { flex: 1, justifyContent: 'center' }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  noData: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export { Todos };
