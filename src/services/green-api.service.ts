import ky from 'ky';
import {
  AccountStateResponce,
  AuthData,
  DeleteLastNotificationResponce,
  Notification,
  SendMessageData,
  SendMessageResponce,
} from '@/models/green-api';

const baseUrl = import.meta.env.VITE_GREEN_API_BASE_URL;
if (!baseUrl) throw new Error('в .env укажите VITE_GREEN_API_BASE_URL');
const kyInstance = ky.create({ prefixUrl: baseUrl });

export class GreenApiService {
  private authData?: AuthData;

  getAuthData(): AuthData | undefined {
    return this.authData;
  }

  setAuthData(authData?: AuthData) {
    this.authData = authData;
  }

  async sendMessage(
    messageData: SendMessageData,
  ): Promise<SendMessageResponce> {
    if (!this.authData)
      throw new Error('для отправки сообщений требуется авторизация');
    const { apiTokenInstance, idInstance } = this.authData;
    return kyInstance
      .post(`waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        json: messageData,
      })
      .json();
  }

  async getAccountState(): Promise<AccountStateResponce> {
    if (!this.authData)
      throw new Error(
        'для проверки состояние аккаунта требуются ключи авторизации',
      );
    const { apiTokenInstance, idInstance } = this.authData;
    return kyInstance
      .get(`waInstance${idInstance}/getStateInstance/${apiTokenInstance}`)
      .json();
  }

  async deleteNotification(
    receiptId: number,
  ): Promise<DeleteLastNotificationResponce> {
    if (!this.authData)
      throw new Error('для удаления уведомлений требуется авторизация');
    const { apiTokenInstance, idInstance } = this.authData;
    return kyInstance
      .delete(
        `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
      )
      .json();
  }

  async getLastNotification(): Promise<Notification | null> {
    if (!this.authData)
      throw new Error('для получения уведомлений требуется авторизация');
    const { apiTokenInstance, idInstance } = this.authData;
    const notification: Notification = await kyInstance
      .get(`waInstance${idInstance}/receiveNotification/${apiTokenInstance}`)
      .json();
    await this.deleteNotification(notification.receiptId);
    return notification;
  }

  async getAllNotifications(): Promise<Notification[]> {
    const notificationList: Notification[] = [];
    let notification: Notification | null = null;
    do {
      try {
        notification = await this.getLastNotification();
      } catch (error) {
        notification = null;
      }
      if (notification) notificationList.push(notification);
    } while (notification);
    return notificationList;
  }

  async isAuthorizedAccount(): Promise<boolean> {
    try {
      return (await this.getAccountState()).stateInstance === 'authorized';
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default new GreenApiService();
