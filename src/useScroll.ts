import { RefObject, useEffect } from 'react';
import { on, off } from './shared/util';
import useRafState from './useRafState';

export interface State {
  x: number;
  y: number;
}

/**
 * React sensor hook that re-renders when the scroll position in a DOM element changes.
 * @param ref
 * @returns
 */
const useScroll = (ref: RefObject<HTMLElement>): State => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof ref === null || typeof ref.current === undefined) {
      console.error('`useScroll` expects a single ref argument.');
    }
  }

  const [state, setState] = useRafState<State>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handler = () => {
      if (ref.current) {
        setState({
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop,
        });
      }
    };

    if (ref.current) {
      on(ref.current, 'scroll', handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      if (ref.current) {
        off(ref.current, 'scroll', handler);
      }
    };
  }, [ref]);

  return state;
};

export default useScroll;
