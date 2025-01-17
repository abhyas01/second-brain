import { RefObject, useEffect } from "react";

interface useOutsideClickProps {
  ref: RefObject<HTMLElement>;
  callback: () => void;
  when: boolean;
}

function useOutsideClick({ ref, callback, when }: useOutsideClickProps) {

  useEffect(() => {
    
    const handler = (e: Event) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as HTMLElement) &&
        !(e.target as HTMLElement).classList.contains("ignore-outside-click")
      ) {
        callback();
      }
    };

    if (when) {
      document.addEventListener("click", handler);
      return () => {
        document.removeEventListener("click", handler);
      };
    }
    
  }, [when, ref, callback]);
}

export default useOutsideClick;
