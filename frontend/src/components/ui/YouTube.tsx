import { ReactElement } from "react";

function YouTube(props: { url: string, className?: string, divClassName?: string }): ReactElement {

  const embedUrl = `https://www.youtube.com/embed/${props.url}`;

  return (
    <div className={`${props.divClassName}`}>
      <iframe
        className={`${props.className}`}
        src={embedUrl}
        title="YouTube video player"
        style={{ border: "none" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default YouTube;
