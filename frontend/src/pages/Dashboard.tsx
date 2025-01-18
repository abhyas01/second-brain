import { ReactElement, useCallback, useState, useRef, memo } from "react";
import TopBar from "../components/ui/TopBar";
import Content from "../components/ui/Content";
import CreateContentModal from "../components/ui/CreateContentModal";
import useOutsideClick from "../hooks/useOutsideClick";
import SideBar from "../components/ui/Sidebar";

const Dashboard = memo((): ReactElement => {
  const [modalOpen, setModalOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);

  const reference = useRef<HTMLDivElement>(null);

  const onSideClick = useCallback(() => {
    setSideOpen(currVal => !currVal);
  }, []);

  useOutsideClick({ref: reference, 
                  callback: () => {
                    setModalOpen(currVal => !currVal);
                  },
                  when: modalOpen
                });

  return (
    <div className="bg-slate-100 min-h-[100vh] w-full">
      
      <div className="flex mx-auto">  
        {sideOpen && 
          <SideBar setSideOpen={onSideClick} />
        }

        <div className="mx-auto">
          <TopBar setSideOpen={onSideClick} isOpen={sideOpen} setModalOpen={useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
            setModalOpen(currVal => !currVal)
            event.currentTarget.blur();
          }, [])} />

          <Content />
        </div>
      </div>

      <CreateContentModal ref={reference} open={modalOpen} onClose={() => {
        setModalOpen(currVal => !currVal);
      }} />
    
    </div>
  );
});

export default Dashboard;