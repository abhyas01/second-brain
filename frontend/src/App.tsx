import { ReactElement, useCallback, useState, useRef } from "react";
import TopBar from "./components/ui/TopBar";
import Content from "./components/ui/Content";
import CreateContentModal from "./components/ui/CreateContentModal";
import useOutsideClick from "./hooks/useOutsideClick";

function App(): ReactElement {
  const [modalOpen, setModalOpen] = useState(false);
  const reference = useRef<HTMLDivElement>(null);

  useOutsideClick({ref: reference, 
                  callback: () => {
                    setModalOpen(currVal => !currVal);
                  },
                  when: modalOpen
                });

  return (
    <div className="p-4 bg-slate-100 min-h-[100vh]">
      <TopBar setModalOpen={useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setModalOpen(currVal => !currVal)
        event.currentTarget.blur();
      }, [])} />

      <CreateContentModal ref={reference} open={modalOpen} onClose={() => {
        setModalOpen(currVal => !currVal);
      }} />

      <Content />
    </div>
  );
}

export default App
