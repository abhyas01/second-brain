import { ReactElement } from "react";
import { IconInput } from "./interfaces/icon-interfaces";
import { Size } from "../interfaces/ui-interfaces";

interface HamburgerIconType extends IconInput{
  onClick?: () => void
}

const sizeStyles: Record<Size, string> = {
  "sm": "size-7",
  "md": "size-9",
  "lg": "size-11"
};

const strokeWidth: Record<Size, string> = {
  "sm":"0.9",
  "md": "1.5",
  "lg": "2.0"
}

function HamburgerIcon(props: HamburgerIconType): ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24"
    strokeWidth={`${strokeWidth[props.strokeWidth]}`}
    stroke="currentColor"
    className={`${sizeStyles[props.size]} ${props.className}`}
    onClick={props.onClick}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
  );
};

export default HamburgerIcon;