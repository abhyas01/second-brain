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
}

const TopBar = memo((props: TopBar): ReactElement => {
  return(
    <div className="h-20 px-5 sm:px-10 md:px-4 lg:px-10 min-w-32 flex justify-between items-center max-w-full mx-auto">
      {
        !props.isOpen &&
        <div className="hover:scale-110 transition-all duration-200">
          <HamburgerIcon size="md" strokeWidth="lg" className="text-purple-600 cursor-pointer" onClick={props.setSideOpen}  />
        </div>
      }
      <div className="flex items-center justify-center ml-auto">
        <Button
          variant="primary"
          onClick={props.setModalOpen}
          startIcon={<PlusIcon size="sm" strokeWidth="sm" />}
          text="Add Content"
          size="sm"
          className="ignore-outside-click mr-2"
          />
        <Button
          variant="secondary"
          onClick={props.onShareBrain}
          startIcon={<ShareIcon size="sm" strokeWidth="sm" />}
          text="Share Brain"
          size="sm"
          className="ignore-outside-click"
          />
      </div>
    </div>
  );
});

export default TopBar;