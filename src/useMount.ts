import useEffectOnce from './useEffectOnce';

/**
 * React lifecycle hook that calls a function after the component is mounted.
 * @param fn
 */
const useMount = (fn: () => void) => {
  useEffectOnce(() => {
    fn();
  });
};

export default useMount;
