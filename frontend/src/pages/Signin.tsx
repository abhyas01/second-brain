import { ReactElement, useState, useRef } from "react";
import InputBox from "../components/ui/InputBox";
import Button from "../components/ui/Button";
import { BACKEND_URL } from '../config';
import { validateSigninInput } from "../utils/util";

function Signin(): ReactElement{

  const [isClicked, setIsClicked] = useState(false);
  const [errMessage, setErrMsg] = useState<string[]>([]);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function signup(event: React.MouseEvent){
    setIsClicked(true);
    const target = event.currentTarget as HTMLElement;

    const username = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;
    
    const { isValid, errors } = validateSigninInput(username as string, password as string);
    if(!isValid){
      setErrMsg(errors);
      setIsClicked(false);
      target.blur();
      return;
    }

    try{
      const response = await fetch(BACKEND_URL + "/api/v1/users/signin", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      const responseJson = await response.json();
      if (!response.ok){
        if (response.status === 403) {
          const errors = Array.isArray(responseJson.msg) ? responseJson.msg : [responseJson.msg];
          setErrMsg(errors);
          return;
        }
        throw new Error(`Response Status: ${response.status}`);
      }
      alert(JSON.stringify(responseJson));
      setErrMsg([]);
    } catch(err) {
      setErrMsg(["Something went wrong. Please try again later."]);
    } finally {
      setIsClicked(false);
      target.blur();
    }
    
  }

  return (
    <div className="min-h-screen min-w-screen py-5 bg-purple-100 flex justify-center items-center">
      
      <div className="bg-slate-100 px-5 py-16 rounded-lg shadow-lg flex flex-col max-h-[1000px] items-center min-w-fit w-72 sm:w-full max-w-96 mx-5">
        
        <div className="flex flex-col justify-center items-center mb-10 gap-2 w-full">
          <div className="text-md text-slate-500">
            Sign in to
          </div>
          <div className="text-3xl text-purple-600 font-light hover:cursor-pointer">
            Second <span className="text-purple-400 font-extrabold">B</span>rain
          </div>          
        </div>

        <div className="flex flex-col justify-center items-center gap-4 w-full"> 
          <InputBox ref={usernameRef} placeholder="Username" className="w-full" />
          <InputBox ref={passwordRef} placeholder="Password" className="w-full" type="password" />
        </div>

        {
          errMessage.length > 0 && 
          <div className="mt-6 break-words text-sm text-red-600 max-w-52 text-center">
            {
              errMessage.map((err, index) => (
                <div className="mb-3" key={index}>{err}</div>
              ))
            }
          </div>
        }

        <Button variant="primary" size="md" text="Sign Up" className={`${errMessage.length > 0 ? "mt-4" : "mt-10"} w-[80%]`} disabled={isClicked} onClick={signup} />
      </div>

    </div>
  );
}

export default Signin;