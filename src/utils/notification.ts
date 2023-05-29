import { Notification } from '@/models/green-api';

export const filterOnlyCurrentChatNotifications =
  (chatId?: string) =>
  (notification: Notification): boolean =>
    (notification.body.typeWebhook === 'incomingMessageReceived' ||
      notification.body.typeWebhook === 'outgoingMessageReceived') &&
    notification.body.senderData?.chatId === chatId;
