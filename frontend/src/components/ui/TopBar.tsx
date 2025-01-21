import { ReactElement, memo } from "react";
import Button from "./Button";
import ShareIcon from "./icons/ShareIcon";
import PlusIcon from "./icons/PlusIcon";
import HamburgerIcon from "./icons/HamburgerIcon";

interface TopBar{
  setModalOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setSideOpen: () => void;
  isOpen: boolean;
  onShareBrain: (event: React.MouseEvent<HTMLButtonElement>) => void;
  pageType: string;
}

const TopBar = memo((props: TopBar): ReactElement => {
  return(
    <div className="z-10 bg-white shadow-lg rounded-b-md sticky top-0 h-20 px-2 sm:px-10 md:px-4 lg:px-10 min-w-32 flex justify-between items-center max-w-8xl w-full mx-auto">
      {
        !props.isOpen &&
        <div className="flex justify-center items-center">
          <HamburgerIcon size="md" strokeWidth="lg" className="text-purple-600 cursor-pointer hover:scale-110 transition-all duration-200" onClick={props.setSideOpen}  />
        </div>
      }

      <div className="text-2xl font-normal text-purple-500 break-words">
        {props.pageType}
      </div>

      <div className="flex items-center justify-center">
        <Button
          variant="primary"
          onClick={props.setModalOpen}
          startIcon={<PlusIcon size="sm" strokeWidth="sm" />}
          text="Add Content"
          size="sm"
          className="ignore-outside-click mr-2"
          topBarComp={true}
          />
        <Button
          variant="secondary"
          onClick={props.onShareBrain}
          startIcon={<ShareIcon size="sm" strokeWidth="sm" />}
          text="Share Brain"
          size="sm"
          className="ignore-outside-click"
          topBarComp={true}
          />
      </div>
    </div>
  );
});

export default TopBar;