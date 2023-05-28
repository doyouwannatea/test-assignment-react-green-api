import { forwardRef } from 'react';

type InputProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <label>
        <p>{label}</p>
        <input ref={ref} {...props} />
      </label>
    );
  },
);

export default BaseInput;
