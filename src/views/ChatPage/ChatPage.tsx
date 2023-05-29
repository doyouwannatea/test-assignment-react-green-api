import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/BaseInput';
import useSendMessageMutation from '@/hooks/useSendMessageMutation';
import useGetAllNotificationsQuery from '@/hooks/useGetAllNotificationsQuery';
import styles from './ChatPage.module.scss';
import { filterOnlyCurrentChatNotifications } from '@/utils/notification';
import ChatMessage from '@/components/ChatMessage';

type ChatFormValues = { message: string };

export default function ChatPage() {
  const { chatId } = useParams();
  const {
    register,
    handleSubmit,
    reset: resetForm,
    setFocus,
  } = useForm<ChatFormValues>();

  const {
    data: notificationList,
    isFetching: isChatNotificationsFetching,
    isLoading: isChatNotificationsLoading,
    refetch,
  } = useGetAllNotificationsQuery({
    enabled: Boolean(chatId),
    refetchOnWindowFocus: false,
    select: (notificationList) =>
      notificationList.filter(filterOnlyCurrentChatNotifications(chatId)),
  });

  const {
    mutate,
    isLoading: isSendMessageLoading,
    isError,
    error,
    reset: resetMutation,
  } = useSendMessageMutation();

  useEffect(() => setFocus('message'), [isSendMessageLoading, setFocus]);
  useEffect(resetMutation, [chatId, resetMutation]);

  const onSendMessage: SubmitHandler<ChatFormValues> = (formValues) => {
    if (!chatId) return;
    mutate({ chatId, message: formValues.message });
    resetForm();
  };

  if (isChatNotificationsLoading) return <p>загрузка сообщений</p>;
  if (isError) return <p>Ошибка: {String(error)}</p>;
  if (!chatId) return <p>Выберите контакт</p>;

  return (
    <section className={styles['page-wrapper']}>
      {notificationList?.length ? (
        <ul className={styles['message-list']}>
          {notificationList?.map((notification) => (
            <li key={notification.receiptId}>
              <ChatMessage notification={notification} />
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
          <BaseButton
            onClick={() => refetch()}
            disabled={isSendMessageLoading}
            type='button'
          >
            обновить сообщения
          </BaseButton>
        </div>
      </form>
    </section>
  );
}
