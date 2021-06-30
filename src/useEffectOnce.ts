import { EffectCallback, useEffect } from 'react';

/**
 * React lifecycle hook that runs an effect only once.
 * @param effect
 */
const useEffectOnce = (effect: EffectCallback) => {
  useEffect(effect, []);
};

export default useEffectOnce;
