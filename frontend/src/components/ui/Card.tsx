import { ReactElement, memo } from "react";
import { CardProps } from "./interfaces/ui-interfaces";
import ShareIcon from "./icons/ShareIcon";
import Tweet from "./Tweet";
import YouTube from "./YouTube";

const Card = memo((props: CardProps): ReactElement => {
  return (
    <div className="min-h-48 max-h-[600px] min-w-fit bg-white rounded-lg shadow-md border-grey-200 border inline-flex max-w-xl p-4 flex-col">
      
      <div className="flex justify-between space-x-28">
        <div className="flex justify-center space-x-2 items-center">
           <ShareIcon size="sm" strokeWidth="sm" />
           <div className="text-md">{props.title}</div>
        </div>
        <div className="flex justify-center space-x-2 items-center">
          <ShareIcon size="sm" strokeWidth="sm" />
          <a href={props.link}>
            <ShareIcon size="sm" strokeWidth="sm" />
          </a>
        </div>
      </div>

      { 
        props.type === "Tweet" &&
          <Tweet url={props.link} />
      }
      {

        props.type === "YouTube" &&
          <YouTube url={props.link} />
      }

    </div>
  );
})

export default Card;