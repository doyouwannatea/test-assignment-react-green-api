import greenApiService from '@/services/green-api.service';
import { useMutation, UseMutationOptions } from 'react-query';

type TData = Awaited<
  ReturnType<(typeof greenApiService)['isAuthorizedAccount']>
>;

type UseCheckAuthMutationOptions = UseMutationOptions<TData>;

const useCheckAuthMutation = (options?: UseCheckAuthMutationOptions) =>
  useMutation(
    'useCheckAuthMutation',
    () => greenApiService.isAuthorizedAccount(),
    options,
  );

export default useCheckAuthMutation;
