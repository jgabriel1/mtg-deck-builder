import { useCallback, useState } from 'react';

type Callback = (...args: any[]) => void | Promise<void>;

export default function useDebounce(
  callback: Callback,
  dependencies: React.DependencyList,
  delay: number
): Callback {
  const [_id, setId] = useState<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      _id && clearTimeout(_id);

      const newId = setTimeout(async () => {
        await callback(...args);
      }, delay);

      setId(newId);
    },
    [...dependencies, callback, delay, _id]
  );
}
