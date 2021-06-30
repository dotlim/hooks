import { useEffect, useState } from 'react';
import useDebounceFn from './useDebounceFn';

export interface DebounceOpts {
  /* 需要延迟的毫秒数 */
  wait?: number;
  /* 指定在延迟开始前调用 */
  leading?: boolean;
  /* 指定在延迟结束后调用 */
  trailing?: boolean;
}

/**
 * A hook that handle the debounce value.
 * @param value
 * @param options
 * @returns
 */
const useDebounce = <T>(value: T, options?: DebounceOpts) => {
  const [debnounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => setDebounced(value), options);

  useEffect(() => {
    run();
  }, [value]);

  return debnounced;
};

export default useDebounce;
