import { forwardRef, ReactElement } from "react";

interface inputBox{
  placeholder: string;
  className?: string;
  type?: string;
}

const InputBox = forwardRef<HTMLInputElement, inputBox>((props: inputBox, reference): ReactElement => {
  return(
    <input
      type={props.type}
      ref={reference}
      placeholder={props.placeholder} 
      className={`bg-white border shadow-sm rounded-md focus:outline focus:outline-2 focus:outline-purple-400 p-2 ${props.className}`}
    />
  );
});

export default InputBox;