export interface SendMessageData {
  chatId: string;
  message: string;
}

export interface SendMessageResponce {
  idMessage: string;
}

export interface AuthData {
  idInstance: string;
  apiTokenInstance: string;
}

export interface AccountStateResponce {
  stateInstance:
    | 'authorized'
    | 'notAuthorized'
    | 'blocked'
    | 'sleepMode'
    | 'starting';
}
