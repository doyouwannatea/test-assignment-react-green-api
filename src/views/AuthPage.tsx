import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/BaseInput';
import useCheckAuthMutation from '@/hooks/useCheckAuthMutation';
import greenApiService from '@/services/green-api.service';
import { SubmitHandler, useForm } from 'react-hook-form';

type AuthFormValues = {
  idInstance: string;
  apiTokenInstance: string;
  phoneNumber: string;
};

export default function AuthPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>();

  const { mutate, isLoading } = useCheckAuthMutation({
    onSuccess: (isChecked) => {
      if (isChecked) {
        console.log('редирект на страницу чата');
        return;
      }
      console.log('не авторизован');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<AuthFormValues> = async (formValues) => {
    console.log(formValues);
    greenApiService.setAuthData({
      apiTokenInstance: formValues.apiTokenInstance,
      idInstance: formValues.idInstance,
    });
    mutate();
  };

  return (
    <div>
      <h2>Добро пожаловать!</h2>
      <p>Пожалуйста, введи то да сё</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          {...register('idInstance', { required: true, disabled: isLoading })}
          type='text'
          placeholder='введите свой idInstance'
          label='idInstance *'
        />
        {errors.idInstance && <p>Введите idInstance</p>}
        <BaseInput
          {...register('apiTokenInstance', {
            required: true,
            disabled: isLoading,
          })}
          type='text'
          placeholder='введите свой apiTokenInstance'
          label='apiTokenInstance *'
        />
        {errors.apiTokenInstance && <p>Введите apiTokenInstance</p>}
        <BaseInput
          {...register('phoneNumber', {
            required: true,
            disabled: isLoading,
            pattern: {
              value: /^\d{11}$/,
              message: 'Номер телефона должен быть в формате: 00000000000',
            },
          })}
          type='text'
          placeholder='введите номер телефона собеседника'
          label='Номер телефона *'
        />
        {errors.phoneNumber && (
          <p>{errors.phoneNumber.message || 'Введите номер телефона'}</p>
        )}
        <BaseButton type='submit' disabled={isLoading}>
          авторизоваться
        </BaseButton>
      </form>
    </div>
  );
}
