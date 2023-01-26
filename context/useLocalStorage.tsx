import { useEffect, useState } from "react";

function useLocalStorage<T>(
  key: string,
  value: T,
  setValue: (value: T) => void
) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      let parsed = saved;
      try {
        parsed = JSON.parse(saved);
      } catch (e) {
        // not JSON
      }
      setValue(parsed as T);
    }
    setIsLoaded(true);
  }, [key, setValue]);

  useEffect(() => {
    if (!isLoaded || !value) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, isLoaded, value]);
}

export default useLocalStorage;
