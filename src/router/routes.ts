export const enum RouteName {
  HomePage = '/',
  AuthPage = '/auth',
  ChatPage = '/chat/:chatId',
}

export const RouteLocation = {
  homePage: '/',
  authPage: '/auth/',
  getChatPage: (chatId: string): string => `/chat/${chatId}/`,
};
