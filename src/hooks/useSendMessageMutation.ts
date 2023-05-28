import greenApiService from '@/services/green-api.service';
import { useMutation, UseMutationOptions } from 'react-query';

type TData = Awaited<ReturnType<(typeof greenApiService)['sendMessage']>>;
type TVariables = Parameters<(typeof greenApiService)['sendMessage']>[0];

type UseSendMessageMutationOptions = UseMutationOptions<
  TData,
  unknown,
  TVariables
>;

const useSendMessageMutation = (options?: UseSendMessageMutationOptions) =>
  useMutation(
    'useCheckAuthMutation',
    (sendMessageData) => greenApiService.sendMessage(sendMessageData),
    options,
  );

export default useSendMessageMutation;
