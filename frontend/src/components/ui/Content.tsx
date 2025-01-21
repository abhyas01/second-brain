import { ReactElement, memo } from "react";
import Card from "./Card";
import useFetchContent from "../../hooks/useFetchContent";
import Loading from "./Loading";
import ErrorFetch from "./ErrorFetch";

const Content = memo((props: {pageType: string}): ReactElement => {
  const { contents, loading, error, fetchContent } = useFetchContent({ type: props.pageType });

  if (error){
    return (
      <ErrorFetch onClick={() => fetchContent(props.pageType)} />
    );
  }

  if(loading){
    return(
      <Loading text="Fetching Content" />
    );
  }

  return (
    <div className="mt-10 over flex flex-wrap gap-6 items-center justify-center max-w-8xl mx-auto min-w-fit sm:px-4 pb-24">
      {
        contents.length > 0 ? (
          contents.map((elem: { [key: string]: any }) => (

            <Card key={elem._id} title={elem.title} type={elem.type as ('Other' | 'Tweet' | 'YouTube')}
            link={elem.link} username={elem.user.username}/>
          ))
        ) : (
          <div className="mt-[40vh] text-3xl font-thin text-purple-500">
            No Content. Create One?
          </div>
        )
      }
    </div>
  );
});

export default Content;