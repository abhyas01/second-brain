import { RefObject, useEffect } from "react";

interface useOutsideClickProps {
  ref: RefObject<HTMLElement>;
  callback: () => void;
  when: boolean;
}

function useOutsideClick({ ref, callback, when }: useOutsideClickProps) {

  useEffect(() => {
    if (when) {
      const handler = (e: Event) => {
        if (
          ref.current &&
          !ref.current.contains(e.target as HTMLElement) &&
          !(e.target as HTMLElement).classList.contains("ignore-outside-click")
        ) {
          callback();
        }
      };
      document.addEventListener("click", handler);
      return () => {
        document.removeEventListener("click", handler);
      };
    }
  }, [when, ref, callback]);
}

export default useOutsideClick;
