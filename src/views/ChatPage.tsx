import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/BaseInput';
import useSendMessageMutation from '@/hooks/useSendMessageMutation';
import { useWatchAuth } from '@/hooks/useWatchAuth';
import { useWatchChatId } from '@/hooks/useWatchChatId';

type ChatFormValues = { message: string };

export default function ChatPage() {
  useWatchAuth();
  useWatchChatId();
  const { chatId } = useParams();
  const { register, handleSubmit } = useForm<ChatFormValues>();

  const { mutate, isLoading } = useSendMessageMutation({
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

  return (
    <form onSubmit={handleSubmit(onSendMessage)}>
      <BaseInput
        {...register('message', { required: true })}
        placeholder='Введите сообщение'
        disabled={isLoading}
      />
      <BaseButton type='submit' disabled={isLoading}>
        отправить сообщение
      </BaseButton>
    </form>
  );
}
