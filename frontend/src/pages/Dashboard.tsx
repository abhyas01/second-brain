import { ReactElement, useCallback, useState, useRef, memo } from "react";
import TopBar from "../components/ui/TopBar";
import Content from "../components/ui/Content";
import CreateContentModal from "../components/ui/CreateContentModal";
import useOutsideClick from "../hooks/useOutsideClick";
import SideBar from "../components/ui/Sidebar";
import BrainShareModal from "../components/ui/BrainShareModal";
// import Loading from "../components/ui/Loading";

const Dashboard = memo((): ReactElement => {
  const [modalOpen, setModalOpen] = useState(false);
  const [sharingModalOpen, setSharingModalOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(true);
  const [pageType, setPageType] = useState<string>('All');

  const referenceContentModal = useRef<HTMLDivElement>(null);
  const referenceBrainShareModal = useRef<HTMLDivElement>(null);

  const setPage = useCallback((type: string) => {
    setPageType(type);
  }, []);

  const onSideClick = useCallback(() => {
    setSideOpen(currVal => !currVal);
  }, []);

  const onModalOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setModalOpen(currVal => !currVal)
    event.currentTarget.blur();
  }, []);

  // Non UI Feature
  const showBrainModal = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
    setSharingModalOpen(currVal => !currVal);
    event.currentTarget.blur();
  }, []);

  useOutsideClick({ref: referenceContentModal, 
                  callback: () => {
                    setModalOpen(currVal => !currVal);
                  },
                  when: modalOpen
                });

  useOutsideClick({ref: referenceBrainShareModal, 
    callback: () => {
      setSharingModalOpen(currVal => !currVal);
    },
    when: sharingModalOpen
  });

  return (
    <div className="bg-slate-200 min-h-[100vh] w-full">
      
      <div className="flex w-full">  
        {sideOpen && 
          <SideBar setPageType={setPage} pageType={pageType} setSideOpen={onSideClick} />
        }

        <div className="mx-auto w-full max-w-8xl">
          <TopBar pageType={pageType} setSideOpen={onSideClick} onShareBrain={showBrainModal} isOpen={sideOpen} setModalOpen={onModalOpen} />

          <Content pageType={pageType} />
        </div>
      </div>

      <CreateContentModal ref={referenceContentModal} open={modalOpen} onClose={() => {
        setModalOpen(currVal => !currVal);
      }} />

      <BrainShareModal ref={referenceBrainShareModal} open={sharingModalOpen} sharing="start" URL="kjashfo78weyf234523j5hfds3244" closeModal={() => {
        setSharingModalOpen(currVal => !currVal);
      }} />

      
    </div>
  );
});

export default Dashboard;