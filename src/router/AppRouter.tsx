import { Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from '@/views/AuthPage';
import ChatPage from '@/views/ChatPage';

export const enum RouteName {
  HomePage = '/',
  AuthPage = '/',
  ChatPage = '/chat',
}

export default function AppRouter() {
  return (
    <Routes>
      <Route index element={<AuthPage />} />
      <Route path='chat' element={<ChatPage />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
