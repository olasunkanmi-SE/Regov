import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

// export type InputSize = "medium" | "large";
export type InputType = "password" | "email" | "text" | "text";

export type InputProps = {
  id: string;
  name: string;
  type?: InputType;
  size?: number;
  className?: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "size">;

export const Input: any = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, type = "text", size, className, placeholder, ...props }, ref) => {
    return (
      <input
        size={size}
        id={id}
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        className={className}
        {...props}
      />
    );
  }
);
