import { ReactElement } from "react";

interface inputBox{
  onChange?: () => {};
  placeholder: string;
  className?: string;
}

function InputBox(props: inputBox): ReactElement{
  return(
    <input 
      placeholder={props.placeholder} 
      className={`bg-white border shadow-sm rounded-md focus:outline focus:outline-2 focus:outline-purple-400 p-2 ${props.className}`}
    />
  );
}

export default InputBox;