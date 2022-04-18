// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
});

const TodoItem = ({
  data,
}: {
  data: { id: string; task: string; done: boolean } | undefined | null;
}): JSX.Element | null => {
  if (data == null) {
    return null;
  }

  return (
    <TouchableOpacity>
      <View style={styles.item}>
        <Text>{`Lorem Ipsum #${data.id}`}</Text>
        <Text style={styles.task} numberOfLines={3}>
          {data.task}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export { TodoItem };
