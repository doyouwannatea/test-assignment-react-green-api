import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/BaseInput';
import useSendMessageMutation from '@/hooks/useSendMessageMutation';
import useGetAllNotificationsQuery from '@/hooks/useGetAllNotificationsQuery';
import styles from './ChatPage.module.scss';
import { filterOnlyCurrentChatNotifications } from '@/utils/notification';

type ChatFormValues = { message: string };

export default function ChatPage() {
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
      console.error(`ошибка отправки сообщения: ${error}`);
    },
  });

  const onSendMessage: SubmitHandler<ChatFormValues> = (formValues) => {
    if (!chatId) return;
    mutate({ chatId, message: formValues.message });
  };

  if (isChatNotificationsLoading) return <p>загрузка сообщений</p>;
  if (!chatId) return <div>Выберите контакт</div>;

  return (
    <section className={styles['page-wrapper']}>
      {notificationList?.length ? (
        <ul className={styles['message-list']}>
          {notificationList?.map((notification) => (
            <li key={notification.receiptId} className={styles.message}>
              {notification.body.messageData?.textMessageData?.textMessage}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles['messages-not-found']}>
          Новые сообщения не найдены
        </p>
      )}
      {isChatNotificationsFetching && (
        <p className={styles.loading}>Загрузка сообщений...</p>
      )}
      <form className={styles.form} onSubmit={handleSubmit(onSendMessage)}>
        <BaseInput
          {...register('message', { required: true })}
          placeholder='Введите сообщение'
          disabled={isSendMessageLoading}
        />
        <div className={styles['controls-wrapper']}>
          <BaseButton type='submit' disabled={isSendMessageLoading}>
            отправить сообщение
          </BaseButton>
          <BaseButton onClick={() => refetch()} disabled={isSendMessageLoading}>
            обновить сообщения
          </BaseButton>
        </div>
      </form>
    </section>
  );
}
