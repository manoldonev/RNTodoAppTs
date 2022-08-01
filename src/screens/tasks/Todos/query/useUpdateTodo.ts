import type { UseMutationResult } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import type { UpdateTodoMutation, UpdateTodoMutationVariables } from '@generated';
import { useUpdateTodoMutation } from '@generated';
import { todoKeys } from './queryKeysFactory';

const useUpdateTodo = (): UseMutationResult<UpdateTodoMutation, Error, UpdateTodoMutationVariables> => {
  const queryClient = useQueryClient();

  return useUpdateTodoMutation({
    onSuccess: async () => queryClient.invalidateQueries(todoKeys.all),
  });
};

export { useUpdateTodo };
