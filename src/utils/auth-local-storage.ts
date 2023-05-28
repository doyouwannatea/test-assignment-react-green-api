import { AuthData } from '@/models/green-api';

export const AUTH_DATA_LS_KEY = 'AUTH_DATA_LS_KEY';

export function getAuthDataFromLocalStorage(): AuthData | undefined {
  try {
    const authData = localStorage.getItem(AUTH_DATA_LS_KEY);
    if (!authData) return;
    return JSON.parse(authData);
  } catch (error) {
    console.log(error);
  }
}

export function setAuthDataToLocalStorage(authData?: AuthData): void {
  if (!authData) localStorage.removeItem(AUTH_DATA_LS_KEY);
  else localStorage.setItem(AUTH_DATA_LS_KEY, JSON.stringify(authData));
}
