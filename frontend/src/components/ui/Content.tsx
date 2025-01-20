import { ReactElement, memo } from "react";
import Card from "./Card";
import useFetchContent from "../../hooks/useFetchContent";
import Loading from "./Loading";

const Content = memo((props: {pageType: string}): ReactElement => {
  const { contents, loading, error, fetchContent } = useFetchContent({ type: props.pageType });

  if (true){
    return (
      <>
      </>
    );
  }

  if(loading){
    return(
      <Loading text="Fetching Content" />
    );
  }

  return (
    <div className="mt-10 over flex flex-wrap gap-4 items-center justify-center max-w-8xl mx-auto min-w-fit sm:px-4 pb-24">
      {
        contents.map((elem: { [key: string]: string }) => (
          <Card key={elem._id} title={elem.title} type={elem.type as ('Other' | 'Tweet' | 'YouTube')}
          link={elem.link}/>
        ))
      }
    </div>
  );
});

export default Content;