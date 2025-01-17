import { ReactElement, memo } from "react";
import Button from "./Button";
import ShareIcon from "./icons/ShareIcon";
import PlusIcon from "./icons/PlusIcon";

const TopBar = memo((props: {setModalOpen: (event: React.MouseEvent<HTMLButtonElement>) => void}): ReactElement => {
  return(
    <div className="flex justify-end items-center gap-x-4">
      <Button
        variant="primary"
        onClick={props.setModalOpen}
        startIcon={<PlusIcon size="md" strokeWidth="md" />}
        text="Add Content"
        size="md"
        />
      <Button
        variant="secondary"
        onClick={() => {}}
        startIcon={<ShareIcon size="md" strokeWidth="md" />}
        text="Share Brain"
        size="md"
        />
    </div>
  );
});

export default TopBar;