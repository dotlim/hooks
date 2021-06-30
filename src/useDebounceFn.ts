import { useRef } from 'react';
import { debounce } from 'lodash';
import { DebounceOpts } from './useDebounce';
import useCreation from './useCreation';
import useUnmount from './useUnmount';

type Fn = (...args: any[]) => any;

/**
 * A hook that handle the debounce function.
 * @param fn
 * @param options
 * @returns
 */
const useDebounceFn = <T extends Fn>(fn: T, options?: DebounceOpts) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const wait = options?.wait ?? 1000;

  const debounced = useCreation(
    () => debounce<T>(((...args: any[]) => fnRef.current(...args)) as T, wait, options),
    [],
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced as unknown as T,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
};

export default useDebounceFn;
