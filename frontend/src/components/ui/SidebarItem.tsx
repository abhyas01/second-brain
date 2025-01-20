import { ReactElement } from "react";

interface SidebarItemInterface{
  text: string;
  icon: ReactElement;
  onClick?: () => void;
  className?: string;
}

function SidebarItem(props: SidebarItemInterface): ReactElement{
  return(
    <div onClick={props.onClick} 
    className={`py-8 border-b font-extralight text-2xl sm:text-lg flex justify-center items-center w-full hover:cursor-pointer hover:bg-purple-200
    transition-all duration-200 rounded-md ${props.className}`}>
      {props.icon}
      <div className="ml-2">
        {props.text}
      </div>
    </div>
  );
};

export default SidebarItem;