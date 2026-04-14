import { useState } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (nextValue: T) => void] {
  const [value, setValue] = useState<T>(defaultValue);

  function updateValue(nextValue: T): void {
    setValue(nextValue);
  }

  return [value, updateValue];
}
