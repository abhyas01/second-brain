import { ReactElement } from "react";

function YouTube(props: { url: string, className?: string, divClassName?: string }): ReactElement {

  const embedUrl = props.url
    ?.replace("watch?v=", "embed/")
    ?.replace(/&t=(\d+)s/, "?start=$1");

  if (!embedUrl.includes("youtube.com/embed/")) {
    return (
    <div className="content-center text-center my-auto text-sm">
      Invalid YouTube URL
    </div>
    );
  }

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