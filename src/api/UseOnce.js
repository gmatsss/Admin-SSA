import { useEffect, useRef } from "react";

function useOnce(callback) {
  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (!hasCalledRef.current) {
      callback();
      hasCalledRef.current = true;
    }
  }, [callback]);
}

export default useOnce;
