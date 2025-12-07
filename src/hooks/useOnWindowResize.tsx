import { useEffect, useRef } from "react";

export default function useOnWindowResize(callback: (event: UIEvent) => void) {
  // 1. Use a ref to store the latest callback.
  // This allows us to access the latest state inside the event handler
  // without needing to re-attach the event listener.
  const callbackRef = useRef(callback);

  // 2. Update the ref whenever the callback changes.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // 3. Create a stable handler that calls the current ref.
    function handleResize(event: UIEvent) {
      if (callbackRef.current) {
        callbackRef.current(event);
      }
    }

    // 4. Add the listener only once (on mount).
    window.addEventListener("resize", handleResize);

    // 5. Clean up only once (on unmount).
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures this runs once.
}
