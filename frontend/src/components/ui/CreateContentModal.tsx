import { ReactElement, forwardRef, useState, useRef } from "react";
import CrossIcon from "./icons/CrossIcon";
import InputBox from "./InputBox";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { validateContentPost } from "../../utils/util";
import { BACKEND_URL } from "../../config";

type propsModal = {
  open: boolean,
  onClose: () => void
}

const CreateContentModal = forwardRef<HTMLDivElement, propsModal>((props: propsModal, reference): ReactElement | null => {
  
  if (!props.open){
    return null;
  }

  const [selectedType, setSelectedType] = useState<string>("");
  const [isClicked, setIsClicked] = useState(false);
  const [errMessage, setErrMsg] = useState<string[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  async function createContent(event: React.MouseEvent){
    setIsClicked(true);
    const target = event.currentTarget as HTMLElement;

    const title = titleRef?.current?.value;
    const link = linkRef?.current?.value;

    const { isValid, errors } = validateContentPost( selectedType, link as string, title as string);
    if(!isValid){
      setErrMsg(errors);
      setIsClicked(false);
      target.blur();
      return;
    }

    try{
      const response = await fetch(BACKEND_URL + "/api/v1/users/content", {
        headers: {
          "X-Auth-Key": localStorage.getItem("Auth-Tok") ?? "",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          title: title,
          link: link,
          type: selectedType
        })
      });
      const responseJson = await response.json();
      if (!response.ok){
        if(response.status === 401 || response.status === 501){
          localStorage.removeItem("Auth-Tok");
          const errors = [responseJson.msg];
          navigate('/signin');
          setErrMsg(errors);
          return;
        } else if (response.status === 411) {
          const errors = Array.isArray(responseJson.msg) ? responseJson.msg : [responseJson.msg];
          setErrMsg(errors);
          return;
        } else {
          throw new Error(`Response Status: ${response.status}`);
        }
      }
      setErrMsg([]);
      props.onClose();
    } catch(err) {
      setErrMsg(["Something went wrong. Please try again later."]);
      console.log(err);
    } finally {
      setIsClicked(false);
      target.blur();
    }

  }
  
    return (
      <div className="z-20 inset-0 fixed w-screen h-screen bg-gradient-to-t from-black/90 to-transparent/70 flex justify-center items-center">
        <div ref={reference} className="bg-slate-100 p-5 m-3 overflow-auto max-h-[650px] rounded-lg min-w-72 sm:w-96 max-w-xl flex flex-col items-stretch gap-4">
          
          <div className="flex justify-end items-center mb-6">
            <CrossIcon size="md" strokeWidth="md" onClick={props.onClose} />
          </div>
          
          <InputBox ref={titleRef} placeholder="Title" />

          <InputBox ref={linkRef} placeholder="Link" />
          
          <div className="w-full bg-slate-200 rounded-xl p-4 mb-3 shadow-lg">
            <div className="text-center mb-3 mt-1 text-md font-semibold text-gray-600">
              Link Type:
            </div>
            <div className="flex justify-between max-w-[90px] mx-auto my-1">
              <input id="tweet" type="radio" name="type" value="Tweet" checked={selectedType === "Tweet"} onChange={(e) => setSelectedType(e.target.value)} />
              <span className="text-sm text-slate-500 font-light">Tweet</span>
            </div>
            <div className="flex justify-between max-w-[90px] mx-auto my-1">
              <input id="youtube" type="radio" name="type" value="YouTube" checked={selectedType === "YouTube"} onChange={(e) => setSelectedType(e.target.value)} />
              <span className="text-sm text-slate-500 font-light ml-8">YouTube</span>
            </div>
            <div className="flex justify-between max-w-[90px] mx-auto my-1">
              <input id="other" type="radio" name="type" value="Other" checked={selectedType === "Other"} onChange={(e) => setSelectedType(e.target.value)} />
              <span className="text-sm text-slate-500 font-light">Other</span>
            </div>
          </div>
          
          {
            errMessage.length > 0 &&
            <div className="w-full text-center break-words mb-2 text-red-500 text-sm">
              {
                errMessage.map((err, index) => (
                  <div key={index} className="my-2">{err}</div>
                ))
              }
            </div>
          }

          <Button
            variant="primary"
            size="md"
            text="Submit"
            onClick={(event: React.MouseEvent) => {
              createContent(event);
            }}
            className="self-center w-[70%]"
            disabled={isClicked}
          />
        
        </div>
      </div>
    );
  });

export default CreateContentModal;