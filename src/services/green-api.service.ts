import ky from 'ky';
import {
  AccountStateResponce,
  AuthData,
  SendMessageData,
  SendMessageResponce,
} from '@/models/green-api';

const baseUrl = import.meta.env.VITE_GREEN_API_BASE_URL;
if (!baseUrl) throw new Error('в .env укажите VITE_GREEN_API_BASE_URL');
const kyInstance = ky.create({ prefixUrl: baseUrl });

export class GreenApiService {
  private authData?: AuthData;

  setAuthData(authData?: AuthData) {
    this.authData = authData;
  }

  async sendMessage(
    messageData: SendMessageData,
  ): Promise<SendMessageResponce> {
    if (!this.authData)
      throw new Error('для отправки сообщений требуется авторизация');
    const { apiTokenInstance, idInstance } = this.authData;
    messageData.chatId = messageData.chatId + '@c.us';
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
