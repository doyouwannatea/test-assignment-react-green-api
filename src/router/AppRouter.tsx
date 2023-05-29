import { Route, Routes, Navigate } from 'react-router-dom';
import { RouteName } from './routes';

import AuthPage from '@/views/AuthPage';
import ChatPage from '@/views/ChatPage';
import HomePage from '@/views/HomePage';

export default function AppRouter() {
  return (
    <Routes>
      <Route index path={RouteName.AuthPage} element={<AuthPage />} />
      <Route path={RouteName.HomePage} element={<HomePage />}>
        <Route index element={<ChatPage />} />
        <Route path={RouteName.ChatPage} element={<ChatPage />} />
      </Route>
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}
