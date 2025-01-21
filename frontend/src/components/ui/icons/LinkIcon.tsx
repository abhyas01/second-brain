import { IconInput } from "./interfaces/icon-interfaces";
import { Size } from "../interfaces/ui-interfaces";
import { ReactElement } from "react";

const sizeStyles: Record<Size, string> = {
  "sm": "size-6",
  "md": "size-7",
  "lg": "size-8"
};

const strokeWidth: Record<Size, string> = {
  "sm": "1",
  "md": "1.5",
  "lg": "2.0"
};

function LinkIcon(props: IconInput): ReactElement{
 return (
  <svg xmlns="http://www.w3.org/2000/svg"
  fill="none" viewBox="0 0 24 24"
  strokeWidth={strokeWidth[props.strokeWidth]}
  stroke="currentColor"
  className={`${sizeStyles[props.size]} ${props.className}`}>
    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>

 );
}

export default LinkIcon;