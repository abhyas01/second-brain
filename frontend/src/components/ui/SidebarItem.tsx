import { ReactElement } from "react";

interface SidebarItemInterface{
  text: string;
  icon: ReactElement;
  onClick?: () => void;
}

function SidebarItem(props: SidebarItemInterface): ReactElement{
  return(
    <div className="my-8 border-b font-extralight text-2xl sm:text-lg flex justify-center items-center w-full hover:cursor-pointer hover:scale-110 transition-all duration-200">
      {props.icon}
      <div className="ml-2">
        {props.text}
      </div>
    </div>
  );
};

export default SidebarItem;