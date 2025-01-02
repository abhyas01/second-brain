import { ReactElement } from "react";
import Button from "./components/ui/Button";
import PlusIcon from "./components/ui/icons/PlusIcon";

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
          <PlusIcon size="sm" strokeWidth="sm" />
        }
        className="mx-2"
      />

      <Button 
        variant="secondary"
        size="md"
        text="Share"
        onClick={() => {}}
        startIcon={
          <PlusIcon size="md" strokeWidth="sm" />
        }
        className="mx-2"
      />

      <Button 
        variant="primary"
        size="lg"
        text="Share"
        onClick={() => {}}
        endIcon={
          <PlusIcon size="md" strokeWidth="lg" />
        } 
        className="mx-2 my-1"
      />

    </>
  );
}

export default App
