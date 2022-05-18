import type { UseMutationResult } from 'react-query';
import { useQueryClient } from 'react-query';
import type { CreateTodoMutation, CreateTodoMutationVariables } from '../../../../generated';
import { useCreateTodoMutation } from '../../../../generated';
import { todoKeys } from '../queryKeysFactory';

const useCreateTodo = (): UseMutationResult<CreateTodoMutation, Error, CreateTodoMutationVariables> => {
  const queryClient = useQueryClient();

  return useCreateTodoMutation({
    onSuccess: async () => queryClient.invalidateQueries(todoKeys.all),
  });
};

export { useCreateTodo };
