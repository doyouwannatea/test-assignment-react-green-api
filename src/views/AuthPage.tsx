import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/BaseInput';
import useCheckAuthMutation from '@/hooks/useCheckAuthMutation';
import { routeLocations } from '@/router/routes';
import greenApiService from '@/services/green-api.service';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type AuthFormValues = {
  idInstance: string;
  apiTokenInstance: string;
};

export default function AuthPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>();

  const [error, setError] = useState<string | undefined>(undefined);

  const { mutate, isLoading } = useCheckAuthMutation({
    onSuccess: (isChecked) => {
      if (isChecked) {
        navigate(routeLocations.homePageLocation);
        return;
      }
      onError();
    },
    onError,
  });

  const onSubmit: SubmitHandler<AuthFormValues> = async (formValues) => {
    greenApiService.setAuthData({
      apiTokenInstance: formValues.apiTokenInstance,
      idInstance: formValues.idInstance,
    });
    mutate();
  };

  function onError(error?: unknown) {
    greenApiService.setAuthData(undefined);
    setError(
      error
        ? String(error)
        : 'Пользователь с введёнными авторизационными данными не найден',
    );
  }

  return (
    <div>
      <h2>Добро пожаловать!</h2>
      <p>Пожалуйста, введи то да сё</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          {...register('idInstance', { required: true })}
          type='text'
          placeholder='введите свой idInstance'
          label='idInstance *'
          disabled={isLoading}
        />
        {errors.idInstance && <p>Введите idInstance</p>}
        <BaseInput
          {...register('apiTokenInstance', {
            required: true,
          })}
          type='text'
          placeholder='введите свой apiTokenInstance'
          label='apiTokenInstance *'
          disabled={isLoading}
        />
        {errors.apiTokenInstance && <p>Введите apiTokenInstance</p>}
        {error && error}
        <BaseButton type='submit' disabled={isLoading}>
          авторизоваться
        </BaseButton>
      </form>
    </div>
  );
}
