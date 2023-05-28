import { PropsWithChildren, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { AuthData } from '@/models/green-api';
import greenApiService from '@/services/green-api.service';
import {
  getAuthDataFromLocalStorage,
  setAuthDataToLocalStorage,
} from '@/utils/auth-local-storage';

const localStorageAuthData = getAuthDataFromLocalStorage();

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<AuthData | undefined>(localStorageAuthData);

  useEffect(() => {
    setAuthData(localStorageAuthData);
  }, []);

  function setAuthData(authData?: AuthData) {
    setAuthDataToLocalStorage(authData);
    greenApiService.setAuthData(authData);
    setData(authData);
  }

  function logout() {
    setAuthData(undefined);
  }

  return (
    <AuthContext.Provider value={{ setAuthData, logout, data }}>
      {children}
    </AuthContext.Provider>
  );
}
