import { ReactElement, memo } from "react";
import { CardProps } from "./interfaces/ui-interfaces";
import ShareIcon from "./icons/ShareIcon";
import Tweet from "./Tweet";
import YouTube from "./YouTube";

const Card = memo((props: CardProps): ReactElement => {
  return (
    <div className="min-h-48 max-h-[600px] w-full max-w-[335px] sm:min-w-80 sm:max-w-96 bg-white rounded-lg shadow-md border-grey-200 border inline-flex p-4 flex-col">
      
      <div className="flex justify-between items-center bg-purple-100 rounded-xl p-2">
        <div className="flex justify-center items-center">
           <ShareIcon size="sm" strokeWidth="sm" />
           <div className="ml-2 text-md max-w-[230px] break-words max-h-[230px] overflow-auto">
             {props.title}
           </div>
        </div>
        <div className="flex justify-center items-center">
          <ShareIcon size="sm" strokeWidth="sm" />
          <a href={props.link}>
            <ShareIcon size="sm" strokeWidth="sm" className="ml-2" />
          </a>
        </div>
      </div>

      { 
        props.type === "Tweet" &&
          <Tweet url={props.link} className="w-full twitter-tweet" divClassName="mt-7 flex justify-center items-center max-w-full" />
      }
      {

        props.type === "YouTube" &&
          <YouTube url={props.link} className="mt-7 h-60 w-full" divClassName="max-w-full flex justify-center items-center" />
      }

    </div>
  );
})

export default Card;