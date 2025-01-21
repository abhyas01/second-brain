import { ReactElement, useEffect } from "react";

declare global{
  interface Window{
    twttr: any;
  }
}

function Tweet(props: { url: string, className?: string, divClassName?: string }): ReactElement {

  useEffect(() => {
    if (!document.querySelector("script[src='https://platform.twitter.com/widgets.js']")) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.head.appendChild(script);
    } else {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    }
  }, []);
  
  const [username, statusId] = props.url.split('/');
  const embedUrl = `https://twitter.com/${username}/status/${statusId}`;

  return (
    <div className={`${props.divClassName}`}>
      <blockquote className={`${props.className}`}>
        <a href={embedUrl}></a>
      </blockquote>
    </div>
  );
}

export default Tweet;