import { ReactElement, memo } from "react";
import { CardProps } from "./interfaces/ui-interfaces";
import CopyLinkButton from "./CopyLinkButton";
import LinkIcon from "./icons/LinkIcon";
import Tweet from "./Tweet";
import YouTube from "./YouTube";
import OtherLink from "./OtherLink";
import DeleteIcon from "./icons/DeleteIcon";

const Card = memo((props: CardProps): ReactElement => {

  const url = props.type === "YouTube" ? `https://www.youtube.com/watch?v=${props.link}`
              : props.type === "Tweet" ? `https://www.twitter.com/${props.link.split('/')[0]}/status/${props.link.split('/')[1]}`
              : props.link;

  return (
    <div className="overflow-auto w-full max-w-[335px] bg-white rounded-lg shadow-md border-grey-200 border inline-flex p-4 flex-col">

      <div className="flex justify-between items-center mb-2">
        
        <div className="relative group">
          <DeleteIcon size="md" strokeWidth="sm" className="text-red-500" />
          <div className="absolute hidden -left-3 w-[140px] text-center bg-purple-200 text-purple-600 p-1 font-bold top-5 opacity-80 group-hover:block rounded-xl">
              Delete Card
          </div>
        </div>

        <div className="flex justify-center items-center space-x-2">
          <a href={url} target="_blank" className="group relative">
            <LinkIcon size="sm" strokeWidth="sm" className="hover:scale-110 transition-all duration-300" />
            <div className="absolute hidden -right-3 w-[140px] text-center bg-purple-200 text-purple-600 p-1 font-bold top-6 opacity-80 group-hover:block rounded-xl">
              Open Link in New Tab
            </div>
          </a>
          <CopyLinkButton link={url} />
        </div>

      </div>

      <div className="text-sm font-light flex items-center justify-center min-h-[40px] max-h-[40px] p-3 rounded-xl bg-slate-200 mb-2 overflow-auto">
        <span className="font-black">username: </span>{props.username}
      </div>
      
      <div className="flex justify-between items-center bg-purple-100 rounded-xl p-2">
        <div className="flex justify-center items-center">
           <div className="ml-2 text-md w-full break-words max-h-[110px] overflow-auto">
             {props.title}
           </div>
        </div>
      </div>

      <div className="mt-2 overflow-auto max-h-60 rounded-xl">
        {
          props.type === "Tweet" ? (
            <Tweet url={props.link} className="w-full h-60 min-h-60 max-h-60 twitter-tweet" divClassName="flex justify-center items-center max-w-full" />
          ) : props.type === "YouTube" ? (
            <YouTube url={props.link} className="h-60 min-h-60 max-h-60 w-full" divClassName="max-w-full flex justify-center items-center" />
          ) : (
            <OtherLink url={props.link} className="size-20" divClassName="max-w-full min-h-60 max-h-60 h-60 w-full flex justify-center
            items-center" />
          )
        }
      </div>

    </div>
  );
})

export default Card;