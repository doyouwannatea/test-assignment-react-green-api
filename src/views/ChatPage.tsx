import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/BaseInput';
import useSendMessageMutation from '@/hooks/useSendMessageMutation';
import { useWatchAuth } from '@/hooks/useWatchAuth';
import { useWatchChatId } from '@/hooks/useWatchChatId';
import useGetAllNotificationsQuery from '@/hooks/useGetAllNotificationsQuery';
import { Notification } from '@/models/green-api';

type ChatFormValues = { message: string };

const filterOnlyCurrentChatNotifications =
  (chatId?: string) =>
  (notification: Notification): boolean =>
    (notification.body.typeWebhook === 'incomingMessageReceived' ||
      notification.body.typeWebhook === 'outgoingMessageReceived') &&
    notification.body.senderData?.chatId === chatId;

export default function ChatPage() {
  useWatchAuth();
  useWatchChatId();
  const { chatId } = useParams();
  const { register, handleSubmit } = useForm<ChatFormValues>();

  const {
    data: notificationList,
    isFetching: isChatNotificationsFetching,
    isLoading: isChatNotificationsLoading,
    refetch,
  } = useGetAllNotificationsQuery({
    enabled: Boolean(chatId),
    select: (notificationList) =>
      notificationList.filter(filterOnlyCurrentChatNotifications(chatId)),
  });
  const { mutate, isLoading: isSendMessageLoading } = useSendMessageMutation({
    onSuccess: () => {
      console.log('сообщение отправлено!');
    },
    onError: (error) => {
      console.log('ошибка отправки сообщения!');
    },
  });

  const onSendMessage: SubmitHandler<ChatFormValues> = (formValues) => {
    if (!chatId) return;
    mutate({ chatId, message: formValues.message });
  };

  if (isChatNotificationsLoading) return <p>загрузка сообщений</p>;

  return (
    <div>
      <ul>
        {notificationList?.map((notification) => (
          <li key={notification.receiptId}>
            {notification.body.messageData?.textMessageData?.textMessage}
          </li>
        ))}
      </ul>
      {isChatNotificationsFetching && '...'}
      <form onSubmit={handleSubmit(onSendMessage)}>
        <BaseInput
          {...register('message', { required: true })}
          placeholder='Введите сообщение'
          disabled={isSendMessageLoading}
        />
        <BaseButton type='submit' disabled={isSendMessageLoading}>
          отправить сообщение
        </BaseButton>
        <BaseButton onClick={() => refetch()} disabled={isSendMessageLoading}>
          обновить сообщения
        </BaseButton>
      </form>
    </div>
  );
}
