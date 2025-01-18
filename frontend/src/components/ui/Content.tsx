import { ReactElement, memo } from "react";
import Card from "./Card";

const Content = memo((): ReactElement => {
  return (
    <div className="mt-10 flex flex-wrap gap-4 items-center justify-center max-w-6xl mx-auto min-w-fit sm:px-4 pb-24">

      <Card title="Tweet Video Interest" type="Tweet" link="https://x.com/ChiragNepal/status/1878654337075019973"/>
      <Card title="YouTube Video Interest" type="YouTube" link="https://www.youtube.com/watch?v=_ZR3Yjp5t7U&t=62s"/>
      <Card title="YouTube Video Interest" type="YouTube" link="https://www.youtube.com/watch?v=_ZR3Yjp5t7U&t=62s"/>
      <Card title="YouTube Video Interest" type="YouTube" link="https://www.youtube.com/watch?v=_ZR3Yjp5t7U&t=62s"/>
      <Card title="YouTube Video Interest" type="YouTube" link="https://www.youtube.com/watch?v=_ZR3Yjp5t7U&t=62s"/>
      <Card title="Found this interesting article on Trump" type="Other" link="https://x.com/ChiragNepal/status/1878654337075019973"/>
    </div>
  );
});

export default Content;