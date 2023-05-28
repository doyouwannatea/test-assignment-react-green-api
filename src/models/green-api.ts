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

export type MessageData = {
  typeMessage: string;
  extendedTextMessageData?: {
    text: string;
    description: string;
    title: string;
    previewType: string;
    jpegThumbnail: string;
  };
  textMessageData?: {
    textMessage: string;
  };
};

export type SenderData = {
  chatId: string;
  chatName: string;
  sender: string;
  senderName: string;
};

export interface Notification {
  receiptId: number;
  body: {
    typeWebhook:
      | 'outgoingAPIMessageReceived'
      | 'outgoingMessageStatus'
      | 'outgoingMessageReceived'
      | 'incomingMessageReceived';
    instanceData: {
      idInstance: number;
      wid: string;
      typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    status: string;
    sendByApi: boolean;
    messageData?: MessageData;
    senderData?: SenderData;
  };
}

export type DeleteLastNotificationResponce = {
  result: boolean;
};
