import { PropsWithChildren } from '@/models/react';
import AppHeader from './AppHeader';

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <AppHeader />
      {children}
    </div>
  );
}
