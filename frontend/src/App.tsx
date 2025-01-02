import { ReactElement } from "react";
import Button from "./components/ui/Button";
import PlusIcon from "./components/ui/icons/PlusIcon";
import ShareIcon from "./components/ui/icons/ShareIcon";

function App(): ReactElement {
  return (
    <>

      <Button 
        variant="primary"
        size="sm"
        text="Share"
        onClick={() => {}}
        startIcon={
          <PlusIcon size="sm" strokeWidth="sm" />
        }
        endIcon={
          <ShareIcon size="sm" strokeWidth="sm" />
        }
        className="mx-2"
      />

      <Button 
        variant="secondary"
        size="md"
        text="Share"
        onClick={() => {}}
        startIcon={
          <PlusIcon size="md" strokeWidth="md" />
        }
        endIcon={
          <ShareIcon size="md" strokeWidth="md" />
        }
        className="mx-2"
      />

      <Button 
        variant="primary"
        size="lg"
        text="Share"
        onClick={() => {}}
        startIcon={
          <ShareIcon size="lg" strokeWidth="lg" />
        }
        endIcon={
          <PlusIcon size="lg" strokeWidth="lg" />
        } 
        className="mx-2 my-1"
      />

    </>
  );
}

export default App
