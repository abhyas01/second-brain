import { ReactElement, memo } from "react";
import CrossIcon from "./icons/CrossIcon";
import SidebarItem from "./SidebarItem";
import TwitterIcon from "./icons/TwitterIcon";
import YoutubeIcon from "./icons/YouTubeIcon";
import DocumentIcon from "./icons/DocumentIcon";
import HamburgerIcon from "./icons/HamburgerIcon";
import Logout from "./icons/Logout";

interface SideBarType{
  setSideOpen: () => void;
  setPageType: (type: string) => void;
  pageType: string;
}

const SideBar = memo((props: SideBarType): ReactElement => {

  return(
    <div className="overflow-auto z-20 flex flex-col justify-between items-stretch h-screen bg-white left-0 top-0 fixed w-full sm:border-r sm:min-w-56 sm:max-w-56 sm:sticky p-8 sm:p-3">
      <div className="flex justify-between items-center mt-3">
        <div className="text-3xl sm:text-2xl font-light text-purple-600 hover:cursor-pointer">
          Second <span className="text-purple-400 font-extrabold">B</span>rain
        </div>
        <div className="hover:scale-125 transition-all duration-200">
          <CrossIcon size="lg" strokeWidth="lg" onClick={props.setSideOpen} className="text-purple-600" />
        </div>
      </div>

      <div>
        <SidebarItem text="All" icon={<HamburgerIcon size="sm" strokeWidth="sm" />}
        onClick={() => props.setPageType("All")} className={`${props.pageType === "All" ? "bg-purple-300" : ""}`} />

        <SidebarItem text="Twitter" icon={<TwitterIcon />}
        onClick={() => props.setPageType("Tweet")} className={`${props.pageType === "Tweet" ? "bg-purple-300" : ""}`} />

        <SidebarItem text="YouTube" icon={<YoutubeIcon />} 
        onClick={() => props.setPageType("YouTube")} className={`${props.pageType === "YouTube" ? "bg-purple-300" : ""}`} />

        <SidebarItem text="Other" icon={<DocumentIcon />}
        onClick={() => props.setPageType("Other")} className={`${props.pageType === "Other" ? "bg-purple-300" : ""}`} />
      </div>

      <div>
        <SidebarItem text="Stop Brain Share" icon={<CrossIcon size="lg" strokeWidth="sm" className="text-black" />} />
        <SidebarItem text="Logout" icon={<Logout size="lg" strokeWidth="sm" />} />
      </div>

    </div>
  );
});

export default SideBar