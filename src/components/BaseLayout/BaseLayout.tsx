import { PropsWithChildren } from '@/models/react';
import { container } from './BaseLayout.module.scss';
import AppHeader from '../AppHeader/AppHeader';

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <div className={container}>
      <AppHeader />
      {children}
    </div>
  );
}
