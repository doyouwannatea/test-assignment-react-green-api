import { PropsWithChildren } from '@/models/react';
import AppHeader from '../AppHeader';
import { container } from './BaseLayout.module.scss';

export default function BaseLayout({ children }: PropsWithChildren) {
  return (
    <div className={container}>
      <AppHeader />
      {children}
    </div>
  );
}
