import type { InfiniteData } from 'react-query';
import type { TodosQuery } from '../../../../generated';
import { useInfiniteTodosQuery } from '../../../../generated';

const pageIndex = 1;
const pageSize = 10;
const sortField = 'id';
const sortDirection = 'desc';

const useTodos = (): {
  data: InfiniteData<TodosQuery> | undefined;
  loadMore: () => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
} => {
  const queryVariables = {
    page: pageIndex,
    limit: pageSize,
    sort: sortField,
    direction: sortDirection,
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } = useInfiniteTodosQuery(
    'page',
    queryVariables,
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.todos == null || lastPage.todos.length < pageSize) {
          return null;
        }

        return { page: allPages.length + 1 };
      },
      keepPreviousData: true,
    },
  );

  const loadMore = (): void => {
    if (hasNextPage ?? false) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchNextPage();
    }
  };

  return { data, loadMore, isLoading, isFetchingNextPage };
};

export { useTodos };
