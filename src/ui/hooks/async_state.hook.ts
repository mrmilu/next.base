import { useEffect, useState } from "react";

export type AsyncState = "resolved" | "pending" | "rejected";

export interface AsyncStateHookOutput {
  state?: AsyncState;
  setPromise: (promise: Promise<any> | null) => void;
}

export const useAsyncState = (delay: number = 0): AsyncStateHookOutput => {
  const [state, setState] = useState<AsyncState | undefined>(undefined);
  const [promise, setInnerPromise] = useState<Promise<any> | null>(null);

  useEffect(() => {
    if (promise) {
      promise
        .then(() => {
          setTimeout(() => {
            setState("resolved");
          }, delay);
        })
        .catch(() => {
          setTimeout(() => {
            setState("rejected");
          }, delay);
        });
    }
  }, [delay, promise]);

  return {
    state,
    setPromise: (promise: Promise<any> | null) => {
      setState("pending");
      setInnerPromise(promise);
    }
  };
};
