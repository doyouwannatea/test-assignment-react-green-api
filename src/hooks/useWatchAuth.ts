import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routeLocations } from '@/router/routes';
import greenApiService from '@/services/green-api.service';

export const useWatchAuth = () => {
  const navigate = useNavigate();
  const authData = greenApiService.getAuthData();

  useEffect(() => {
    if (!authData) navigate(routeLocations.authPageLocation);
  }, [authData, navigate]);
};
