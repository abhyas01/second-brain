import { useState } from "react";
import CopyIcon from "./icons/CopyIcon";

function CopyLinkButton(props: { link: string }) {
  
  const [tooltipText, setTooltipText] = useState("Copy link to clipboard");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(props.link);
      setTooltipText("Copied!");
      setTimeout(() => setTooltipText("Copy link to clipboard"), 2000);
    } catch(err) {
      setTooltipText("Failed to copy!");
    }
  };

  return (
    <div className="group relative">
      <CopyIcon
        size="sm"
        strokeWidth="sm"
        className="cursor-pointer hover:scale-110 transition-all duration-300"
        onClick={copyToClipboard}
      />
      <div className="absolute hidden -right-3 w-[140px] text-center bg-purple-200 text-purple-600 p-1 font-bold top-6 opacity-80 group-hover:block rounded-xl">
        {tooltipText}
      </div>
    </div>
  );
}

export default CopyLinkButton;
