import { IconInput } from "./interfaces/icon-interfaces";
import { Size } from "../interfaces/ui-interfaces";
import { ReactElement } from "react";

const sizeStyles: Record<Size, string> = {
  "sm": "size-3",
  "md": "size-4",
  "lg": "size-5"
};

const strokeWidth: Record<Size, string> = {
  "sm": "2",
  "md": "2.5",
  "lg": "2.6"
};

function ShareIcon(props: IconInput): ReactElement{
  return(
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={`${strokeWidth[props.strokeWidth]}`}
      stroke="currentColor"
      className={`
        ${sizeStyles[props.size]}
        ${props.className}
      `}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
    </svg>
  );
};

export default ShareIcon;