import { ReactElement, forwardRef } from "react";
import CrossIcon from "./icons/CrossIcon";
import InputBox from "./InputBox";
import Button from "./Button";

type propsModal = {
  open: boolean,
  onClose: () => void
}

const CreateContentModal = forwardRef<HTMLDivElement, propsModal>((props: propsModal, reference): ReactElement | null => {
if (!props.open){
  return null;
}
  return (
    <div className="inset-0 fixed w-screen h-screen bg-gradient-to-t from-black/60 to-transparent/50 flex justify-center items-center">
      <div ref={reference} className="bg-slate-100 p-5 rounded-lg min-w-72 max-w-xl flex flex-col items-stretch gap-4">
        
        <div className="flex justify-end items-center mb-6">
          <CrossIcon size="md" strokeWidth="lg" onClick={props.onClose} />
        </div>
        
        <InputBox placeholder="Title" />
        
        <InputBox placeholder="Link" />
        
        <Button
          variant="primary"
          size="md"
          text="Submit"
          onClick={props.onClose}
          className="self-center"
        />
      
      </div>
    </div>
   );
});

export default CreateContentModal;