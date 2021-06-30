import { useEffect, useState } from 'react';
import useThrottleFn from './useThrottleFn';

export interface ThrottleOpts {
  /* 需要延迟的毫秒数 */
  wait?: number;
  /* 指定在延迟开始前调用 */
  leading?: boolean;
  /* 指定在延迟结束后调用 */
  trailing?: boolean;
}

/**
 * A hook that handle the throttle value.
 * @param value
 * @param options
 * @returns
 */
const useThrottle = <T>(value: T, options?: ThrottleOpts) => {
  const [throttled, setThrottled] = useState(value);

  const { run } = useThrottleFn(() => setThrottled(value), options);

  useEffect(() => {
    run();
  }, [value]);

  return throttled;
};

export default useThrottle;
