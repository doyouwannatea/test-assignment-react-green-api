import { PropsWithChildren } from '@/models/react';
import styles from './BaseButton.module.scss';

type ButtonProps = PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export default function BaseButton({ children, ...buttonProps }: ButtonProps) {
  return (
    <button {...buttonProps} className={styles.button}>
      {children}
    </button>
  );
}
