import { ReactElement, memo } from "react";
import CrossIcon from "./icons/CrossIcon";
import SidebarItem from "./SidebarItem";
import TwitterIcon from "./icons/TwitterIcon";
import YoutubeIcon from "./icons/YouTubeIcon";
import DocumentIcon from "./icons/DocumentIcon";

const SideBar = memo((props: {setSideOpen: () => void}): ReactElement => {

  return(
    <div className="h-screen bg-white left-0 top-0 fixed w-full sm:border-r sm:min-w-56 sm:max-w-56 sm:sticky p-8 sm:p-3">
      <div className="flex justify-between items-center">
        <div className="text-3xl sm:text-2xl font-bold text-purple-600">
          Second <span className="text-purple-400">B</span>rain
        </div>
        <CrossIcon size="lg" strokeWidth="lg" onClick={props.setSideOpen} className="text-purple-600" />
      </div>
      <div className="mt-32">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="YouTube" icon={<YoutubeIcon />} />
        <SidebarItem text="Document" icon={<DocumentIcon />} />
      </div>
    </div>
  );
});

export default SideBar