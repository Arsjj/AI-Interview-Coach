import { useRef } from "react";

export const useAsyncLock = () => {
  const lockeRef = useRef(false);

  async function run<T>(callback: () => Promise<T>) {
    if (!lockeRef.current) {
      lockeRef.current = true;
      try {
        return await callback();
      } finally {
        lockeRef.current = false;
      }
    }
  }

  return { run };
};
