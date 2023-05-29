import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import BaseButton from '@/components/BaseButton';
import BaseInput from '@/components/BaseInput';
import { useAuthContext } from '@/context/auth-context/AuthContext';
import useCheckAuthMutation from '@/hooks/useCheckAuthMutation';
import { RouteLocation } from '@/router/routes';
import styles from './AuthPage.module.scss';

type AuthFormValues = {
  idInstance: string;
  apiTokenInstance: string;
};

export default function AuthPage() {
  const authContext = useAuthContext();
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
        navigate(RouteLocation.homePage);
        return;
      }
      onError();
    },
    onError,
  });

  const onSubmit: SubmitHandler<AuthFormValues> = async (formValues) => {
    authContext.setAuthData({
      apiTokenInstance: formValues.apiTokenInstance,
      idInstance: formValues.idInstance,
    });
    mutate();
  };

  function onError(error?: unknown) {
    authContext.setAuthData(undefined);
    setError(
      error
        ? String(error)
        : 'Пользователь с введёнными авторизационными данными не найден',
    );
  }

  return (
    <div>
      <h2>Добро пожаловать!</h2>
      <p className={styles.subtitle}>Пожалуйста, введи то да сё</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles['input-wrapper']}>
          <BaseInput
            {...register('idInstance', { required: true })}
            type='text'
            placeholder='введите свой idInstance'
            label='idInstance *'
            disabled={isLoading}
          />
          {errors.idInstance && <p>Введите idInstance</p>}
        </div>
        <div className={styles['input-wrapper']}>
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
        </div>
        <BaseButton type='submit' disabled={isLoading}>
          авторизоваться
        </BaseButton>
      </form>
    </div>
  );
}
