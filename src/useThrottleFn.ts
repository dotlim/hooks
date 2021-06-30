import { useRef } from 'react';
import { throttle } from 'lodash';
import useCreation from './useCreation';
import { ThrottleOpts } from './useThrottle';
import useUnmount from './useUnmount';

type Fn = (...args: any[]) => any;

/**
 * A hook that handle the throttle function.
 * @param fn 
 * @param options 
 * @returns 
 */
const useThrottleFn = <T extends Fn>(fn: T, options?: ThrottleOpts) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const wait = options?.wait ?? 1000;

  const throttled = useCreation(
    () => throttle<T>(((...args: any[]) => fnRef.current(...args)) as T, wait, options),
    [],
  );

  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: throttled as unknown as T,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
};

export default useThrottleFn;