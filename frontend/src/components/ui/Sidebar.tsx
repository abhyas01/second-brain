import { ReactElement, memo } from "react";
import CrossIcon from "./icons/CrossIcon";
import SidebarItem from "./SidebarItem";
import TwitterIcon from "./icons/TwitterIcon";
import YoutubeIcon from "./icons/YouTubeIcon";
import DocumentIcon from "./icons/DocumentIcon";
import Logout from "./icons/Logout";

const SideBar = memo((props: {setSideOpen: () => void}): ReactElement => {

  return(
    <div className="flex flex-col justify-between items-stretch h-screen bg-white left-0 top-0 fixed w-full sm:border-r sm:min-w-56 sm:max-w-56 sm:sticky p-8 sm:p-3">
      <div className="flex justify-between items-center mt-3">
        <div className="text-3xl sm:text-2xl font-light text-purple-600 hover:cursor-pointer">
          Second <span className="text-purple-400 font-extrabold">B</span>rain
        </div>
        <div className="hover:scale-125 transition-all duration-200">
          <CrossIcon size="lg" strokeWidth="lg" onClick={props.setSideOpen} className="text-purple-600" />
        </div>
      </div>

      <div>
        <SidebarItem text="Tweet Links" icon={<TwitterIcon />} />
        <SidebarItem text="YouTube Links" icon={<YoutubeIcon />} />
        <SidebarItem text="Other Links" icon={<DocumentIcon />} />
      </div>

      <div>
        <SidebarItem text="Logout" icon={<Logout size="lg" strokeWidth="sm" />} />
      </div>

    </div>
  );
});

export default SideBar