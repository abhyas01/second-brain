import { ReactElement } from "react";
import Button from "./Button";

function ErrorFetch(props: {onClick: () => Promise<void>}): ReactElement{
  return (
    <div className="inset-0 fixed w-screen h-screen bg-gradient-to-t from-black/70 to-transparent/70 flex justify-center items-center">
      <div>
        <div className="text-purple-200 text-center mt-5 text-xl max-w-[300px] bg-slate-800 px-10 py-10 rounded-xl">
          <div>
            Error!
          </div>
           <div className="break-words mt-8">
            Can't fetch the content at the moment. Try Again?
           </div>
           <Button variant="secondary" size="lg" text="Try Again" className="mt-8" onClick={props.onClick} />
        </div>
      </div>
    </div>
  );
}

export default ErrorFetch