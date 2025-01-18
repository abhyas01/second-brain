import { ReactElement } from 'react';
import { Size } from '../interfaces/ui-interfaces';
import { IconInput } from './interfaces/icon-interfaces';

const sizeStyles: Record<Size, string> = {
  "sm": "size-4",
  "md": "size-5",
  "lg": "size-6"
};

const strokeWidth: Record<Size, string> = {
  "sm": "1.5",
  "md": "2",
  "lg": "2.3"
};

function PlusIcon(props: IconInput): ReactElement{
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={`
        ${strokeWidth[props.strokeWidth]}
      `}
      stroke="currentColor"
      className={`
        ${sizeStyles[props.size]}
        ${props.className}
      `}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
};

export default PlusIcon;