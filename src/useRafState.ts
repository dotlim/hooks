import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import useUnmount from './useUnmount';

/**
 * React state hook that only updates state in the callback of requestAnimationFrame.
 * @param initialState
 * @returns
 */
const useRafState = <S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] => {
  const frame = useRef(0);
  const [state, setState] = useState(initialState);

  const setRefState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useUnmount(() => {
    cancelAnimationFrame(frame.current);
  });

  return [state, setRefState];
};

export default useRafState;