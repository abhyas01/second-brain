import { ReactElement } from "react";
import { Size } from '../interfaces/ui-interfaces';
import { IconInput } from './interfaces/icon-interfaces';

interface IconInputCross extends IconInput{
  onClick?: () => void
}

const sizeStyles: Record<Size, string> = {
  "sm": "size-4",
  "md": "size-5",
  "lg": "size-7"
};

const strokeWidth: Record<Size, string> = {
  "sm": "1.5",
  "md": "2.3",
  "lg": "2.5"
};

function CrossIcon(props: IconInputCross): ReactElement{
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth[props.strokeWidth]}
      stroke="currentColor" 
      className={`${sizeStyles[props.size]} ${props.className} cursor-pointer`}
      onClick={props.onClick}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

export default CrossIcon;