import greenApiService from '@/services/green-api.service';
import { useMutation, UseMutationOptions } from 'react-query';

type TData = Awaited<
  ReturnType<(typeof greenApiService)['isAuthorizedAccount']>
>;

type UseCheckAuthMutationOptions = UseMutationOptions<TData>;

export const USE_CHECK_AUTH_MUTATION_KEY = 'USE_CHECK_AUTH_MUTATION_KEY';

const useCheckAuthMutation = (options?: UseCheckAuthMutationOptions) =>
  useMutation(
    USE_CHECK_AUTH_MUTATION_KEY,
    () => greenApiService.isAuthorizedAccount(),
    options,
  );

export default useCheckAuthMutation;
