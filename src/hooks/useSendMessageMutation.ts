import greenApiService from '@/services/green-api.service';
import { useMutation, UseMutationOptions } from 'react-query';

type TData = Awaited<ReturnType<(typeof greenApiService)['sendMessage']>>;
type TVariables = Parameters<(typeof greenApiService)['sendMessage']>[0];

type UseSendMessageMutationOptions = UseMutationOptions<
  TData,
  unknown,
  TVariables
>;

export const USE_SEND_MESSAGE_MUTATION_KEY = 'USE_SEND_MESSAGE_MUTATION_KEY';

const useSendMessageMutation = (options?: UseSendMessageMutationOptions) =>
  useMutation(
    USE_SEND_MESSAGE_MUTATION_KEY,
    (sendMessageData) => greenApiService.sendMessage(sendMessageData),
    options,
  );

export default useSendMessageMutation;
