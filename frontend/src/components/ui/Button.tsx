import { ReactElement } from "react";
import { Size } from './interfaces/ui-interfaces';

type Variants = "primary" | "secondary";

interface ButtonProps{
  variant: Variants;
  size: Size;
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  className?: string;
  onClick: ((event: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  disabled?: boolean;
  topBarComp?: boolean;
};

const defaultStyles = "rounded-md inline-flex justify-center items-center";

const sizeStyles: Record<Size, string> = {
  "sm": "py-1 px-2 text-sm",
  "md": "py-2 px-4 text-md",
  "lg": "py-4 px-7 text-lg"
};

const sizeStylesTopBar: Record<Size, string> = {
  "sm": "py-1 sm:px-2 px-[2px]  text-sm",
  "md": "py-2 sm:px-4 px-[4px] text-md",
  "lg": "py-4 sm:px-7 px-[6px] text-lg"
};

const variantStyles: Record<Variants, string> = {
  "primary": "bg-purple-600 text-white hover:bg-purple-500 focus:bg-purple-900",
  "secondary": "bg-purple-300 text-purple-600 hover:bg-slate-300 focus:bg-slate-400"
};

const Button = (props: ButtonProps): ReactElement => {
  return(
    <button 
      className={`
        ${defaultStyles}
        ${variantStyles[props.variant]}
        ${props.topBarComp ? sizeStylesTopBar[props.size] : sizeStyles[props.size] }
        ${props.className}
        ${props.disabled ? "disabled hover:cursor-wait opacity-50" : ""}
      `}
      onClick={props.onClick}
    >
      { props.startIcon &&
          <div className="mr-1">
            {props.startIcon}
          </div>
      }
      {  props.disabled ? "Loading..." : props.text }
      { props.endIcon && 
        <div className="ml-1">
          {props.endIcon}
        </div>
      }
    </button>
  );
};

export default Button;