import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const useFetchContent = (props: { type: string }) => {

  const navigate = useNavigate();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  async function fetchContent(type: string){
    try{
      setError(false);
      setLoading(true);
      setContents([]);
      const response = await fetch(BACKEND_URL + `/api/v1/users/content/${type.toLowerCase()}`, {
        headers: {
          "X-Auth-Key": localStorage.getItem('Auth-Tok') ?? "",
          "Content-Type": "application/json"
        },
        method: "GET"
      });
      const responseJson = await response.json();
      if(!response.ok){
        if(response.status === 401 || response.status === 501){
          localStorage.removeItem("Auth-Tok");
          navigate('/signin');
          return;
        } else {
          throw new Error(`Response Status: ${response.status}`);
        }
      }
      setContents(responseJson.contents);
    } catch(err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async function(){
      await fetchContent(props.type);
    })();
  }, [ props.type ]);

  return { contents, loading, error, fetchContent };
}

export default useFetchContent;