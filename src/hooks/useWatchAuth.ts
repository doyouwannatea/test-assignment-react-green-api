import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteLocation } from '@/router/routes';
import { useAuthContext } from '@/context/auth-context/AuthContext';

export const useWatchAuth = () => {
  const navigate = useNavigate();
  const { data: authData } = useAuthContext();

  useEffect(() => {
    if (!authData) navigate(RouteLocation.authPage);
  }, [authData, navigate]);
};
