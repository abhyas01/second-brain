import { ReactElement, useEffect } from "react";

function Tweet(props: { url: string, className?: string, divClassName?: string }): ReactElement {

  useEffect(() => {
    if (!document.querySelector("script[src='https://platform.twitter.com/widgets.js']")) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);
  
  const embedUrl = props.url.replace("x.com", "twitter.com");
  
  if (!embedUrl.includes("twitter.com/")) {
    return (
    <div className="content-center text-center my-auto text-sm">
      Invalid Tweet URL
    </div>
    );
  }

  return (
    <div className={`${props.divClassName}`}>
      <blockquote className={`${props.className}`}>
        <a href={embedUrl}></a>
      </blockquote>
    </div>
  );
}

export default Tweet;