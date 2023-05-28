import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeLocations } from '@/router/routes';
import { useAuthContext } from '@/context/auth-context/AuthContext';

export const useWatchAuth = () => {
  const navigate = useNavigate();
  const { data: authData } = useAuthContext();

  useEffect(() => {
    if (!authData) navigate(routeLocations.authPageLocation);
  }, [authData, navigate]);
};
