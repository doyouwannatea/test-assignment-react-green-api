import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RouteName } from '@/router/routes';

export const useWatchChatId = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!chatId) navigate(RouteName.AuthPage);
  }, [navigate, chatId]);
};
