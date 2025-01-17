import { ReactElement, useCallback, useState } from "react";
import TopBar from "./components/ui/TopBar";
import Content from "./components/ui/Content";
import CreateContentModal from "./components/ui/CreateContentModal";

function App(): ReactElement {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-4 bg-slate-100 min-h-[100vh]">
      <TopBar setModalOpen={useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setModalOpen(currVal => !currVal)
        event.currentTarget.blur();
      }, [])} />

      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(currVal => !currVal);
      }} />

      <Content />
    </div>
  );
}

export default App
