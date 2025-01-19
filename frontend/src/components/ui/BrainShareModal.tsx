import { ReactElement, forwardRef } from "react";
import CrossIcon from "./icons/CrossIcon";

interface BrainShareModalType{
  open: boolean;
  sharing: "start" | "stop";
  URL?: string;
  closeModal: () => void;
}

const BrainShareModal = forwardRef<HTMLDivElement, BrainShareModalType>((props: BrainShareModalType, reference): ReactElement | null => {
  if (!props.open){
    return null;
  }
  return(
    <div className="inset-0 fixed w-screen h-screen bg-gradient-to-t from-black/60 to-transparent/50 flex justify-center items-center">
      <div ref={reference} className="bg-slate-100 p-5 rounded-lg min-w-72 sm:w-96 max-w-xl flex flex-col items-stretch gap-4 mx-5">
        
        <div className="flex justify-end items-center mb-3">
          <CrossIcon size="md" strokeWidth="md" onClick={props.closeModal} />
        </div>

        <div>
        {
          props.sharing === "start" ? (
            <div className="mb-8">
              <div className="text-xl mb-5 py-5 flex justify-center items-center bg-green-200 text-black rounded-lg">
                <span className="text-purple-400 font-extrabold">B</span> rain is being shared
              </div>
              <div className="text-md text-center mb-2">
                URL:
              </div>
              <div className="text-md text-purple-600 text-center break-words">
                http://localhost:5173/{props.URL}
              </div>
            </div>
          ) : (
            <div className="mb-8">
              <div className="text-xl py-5 flex justify-center items-center bg-red-100 text-black rounded-lg">
                <span className="text-purple-400 font-extrabold">B</span>rain stopped sharing
              </div>
            </div>
          ) 
        }
        </div>

        
      </div>
    </div>
  );
});

export default BrainShareModal;