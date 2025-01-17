import { ReactElement } from "react";
import Card from "./Card";

const Content = (): ReactElement => {
  return (
    <div className="mt-10 flex flex-wrap gap-4 items-center justify-center">
      <Card title="Tweet Video Interest" type="Tweet" link="https://x.com/ChiragNepal/status/1878654337075019973"/>
      <Card title="YouTube Video Interest" type="YouTube" link="https://www.youtube.com/watch?v=_ZR3Yjp5t7U&t=62s"/>
      <Card title="YouTube Video Interest" type="YouTube" link="https://www.youtube.com/watch?v=_ZR3Yjp5t7U&t=62s"/>
      <Card title="YouTube Video Interest" type="YouTube" link="https://www.youtube.com/watch?v=_ZR3Yjp5t7U&t=62s"/>
      <Card title="YouTube Video Interest" type="YouTube" link="https://www.youtube.com/watch?v=_ZR3Yjp5t7U&t=62s"/>
      <Card title="Tweet Video Interest" type="Tweet" link="https://x.com/ChiragNepal/status/1878654337075019973"/>
    </div>
  );
};

export default Content;