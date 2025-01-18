import { ReactElement, useState } from "react";
import InputBox from "../components/ui/InputBox";
import Button from "../components/ui/Button";

function Signup(): ReactElement{
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="h-screen w-screen bg-purple-100 flex justify-center items-center">
      
      <div className="bg-slate-100 px-5 py-16 rounded-lg shadow-lg flex flex-col items-center min-w-fit w-72 sm:w-full max-w-96">
        
        <div className="flex flex-col justify-center items-center mb-10 gap-2 w-full">
          <div className="text-md text-slate-500">
            Sign up to
          </div>
          <div className="text-3xl text-purple-600 font-light hover:cursor-pointer">
            Second <span className="text-purple-400 font-extrabold">B</span>rain
          </div>          
        </div>

        <div className="flex flex-col justify-center items-center gap-4 w-full"> 
          <InputBox placeholder="Username" className="w-full" />
          <InputBox placeholder="Password" className="w-full" />
          <InputBox placeholder="Re-enter Password" className="w-full" />
        </div>

        <Button variant="primary" size="md" text="Sign Up" className="mt-10 w-[80%]" disabled={isClicked} onClick={() => {
          setIsClicked(true);
        }} />
      </div>

    </div>
  );
}

export default Signup;