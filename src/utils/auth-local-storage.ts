import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from './local-storage';
import { AuthData } from '@/models/green-api';

export const AUTH_DATA_LS_KEY = 'AUTH_DATA_LS_KEY';
export function getAuthDataFromLocalStorage(): AuthData | undefined {
  return getDataFromLocalStorage(AUTH_DATA_LS_KEY);
}
export function setAuthDataToLocalStorage(authData?: AuthData): void {
  setDataToLocalStorage(authData, AUTH_DATA_LS_KEY);
}
