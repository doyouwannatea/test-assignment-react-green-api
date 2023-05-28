import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/BaseInput';
import { useWatchAuth } from '@/hooks/useWatchAuth';
import { routeLocations } from '@/router/routes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type PhoneFormValues = {
  phoneNumber: string;
};

export default function HomePage() {
  useWatchAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormValues>();

  const onSubmit: SubmitHandler<PhoneFormValues> = (formValues) => {
    navigate(routeLocations.getChatPageLocation(formValues.phoneNumber));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseInput
        {...register('phoneNumber', {
          required: true,
          pattern: {
            value: /^\d{11}$/,
            message: 'Номер телефона должен быть в формате: 00000000000',
          },
        })}
        type='text'
        placeholder='введите номер телефона собеседника'
      />
      {errors.phoneNumber && (
        <p>{errors.phoneNumber.message || 'Введите номер телефона'}</p>
      )}
      <BaseButton type='submit'>Открыть чат</BaseButton>
    </form>
  );
}
