import { ReactElement } from "react";
import { Size } from '../interfaces/ui-interfaces';
import { IconInput } from './interfaces/icon-interfaces';

const sizeStyles: Record<Size, string> = {
  "sm": "size-4",
  "md": "size-6",
  "lg": "size-7"
};

const strokeWidth: Record<Size, string> = {
  "sm": "1",
  "md": "1.5",
  "lg": "2"
};

function CrossIcon(props: IconInput): ReactElement{
  return(
    <svg xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24" strokeWidth={`${strokeWidth[props.strokeWidth]}`}
    stroke="currentColor" 
    className={`${sizeStyles[props.size]} ${props.className}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
    </svg>
  );
}

export default CrossIcon;