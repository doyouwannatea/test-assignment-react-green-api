export const enum RouteName {
  HomePage = '/',
  AuthPage = '/auth',
  ChatPage = '/chat/:chatId',
}

export const routeLocations = {
  homePageLocation: '/',
  authPageLocation: '/auth',
  getChatPageLocation: (chatId: string): string => `/chat/${chatId}`,
};
