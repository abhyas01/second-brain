import { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps{
  variant: Variants;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;
}

const defaultStyles = "rounded-md p-4"

const sizeStyles = {
  "sm": "py-1 px-2",
  "md": "py-2 px-4",
  "lg": "py-4 px-6"
}

const variantStyles: Record<Variants, string> = {
  "primary": "bg-purple-600 text-white",
  "secondary": "bg-purple-300 text-purple-600"
}

const Button = (props: ButtonProps) => {
  return(
    <button className={`${variantStyles[props.variant]} ${defaultStyles}
    ${sizeStyles[props.size]} ${defaultStyles}`}>
      {props.text}
    </button>
  );
}

export default Button;