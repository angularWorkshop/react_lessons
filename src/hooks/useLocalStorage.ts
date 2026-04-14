import { useEffect, useState } from 'react';

function readStoredValue<T>(key: string, defaultValue: T): T {
  const rawValue = localStorage.getItem(key);
  if (!rawValue) {
    return defaultValue;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return defaultValue;
  }
}

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (nextValue: T) => void] {
  const [value, setValue] = useState<T>(() => readStoredValue(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  function updateValue(nextValue: T): void {
    setValue(nextValue);
  }

  return [value, updateValue];
}
