import { useEffect } from "react";

export default function useOnWindowResize(callback: () => void, dependencies: any[] = []) {
  useEffect(() => {
    function handleResize() {
      callback();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...dependencies]);
}