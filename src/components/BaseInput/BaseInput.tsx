import { forwardRef } from 'react';
import styles from './BaseInput.module.scss';

type InputProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className={className}>
        {label && <p className={styles.label}>{label}</p>}
        <input ref={ref} {...props} className={styles.input} />
      </label>
    );
  },
);

export default BaseInput;
