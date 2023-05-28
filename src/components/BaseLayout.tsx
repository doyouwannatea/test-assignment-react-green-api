import { PropsWithChildren } from '@/models/react';

export default function BaseLayout({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}
