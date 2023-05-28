import { createContext, useContext } from 'react';
import { AuthData } from '@/models/green-api';
import { noop } from '@/utils/shared';

export type AuthContextData = {
  data?: AuthData;
  setAuthData: (data?: AuthData) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextData>({
  logout: noop,
  setAuthData: noop,
  data: undefined,
});

export const useAuthContext = () => useContext(AuthContext);
