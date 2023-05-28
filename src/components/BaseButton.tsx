import { PropsWithChildren } from '@/models/react';

type ButtonProps = PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export default function BaseButton({ children, ...buttonProps }: ButtonProps) {
  return <button {...buttonProps}>{children}</button>;
}
