import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from './local-storage';

export const CONTACT_LIST_LS_KEY = 'CONTACT_LIST_LS_KEY';

export function getContactListFromLocalStorage(): string[] {
  return getDataFromLocalStorage(CONTACT_LIST_LS_KEY) || [];
}
export function setContactListToLocalStorage(contactList?: string[]): void {
  setDataToLocalStorage(contactList, CONTACT_LIST_LS_KEY);
}
