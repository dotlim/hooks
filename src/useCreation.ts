import { useRef } from 'react';
import { isEqual } from 'lodash';

/**
 * `useCreation` is the replacement for `useMemo` or `useRef`.
 * @param factory
 * @param deps
 * @returns
 */
const useCreation = <T>(factory: () => T, deps: any[]) => {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });

  if (!current.initialized || !isEqual(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }

  return current.obj as T;
};

export default useCreation;
