export const noop = () => {};

export function on<T extends Window | Document | HTMLElement | EventTarget>(
  target: T | null,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
) {
  if (target?.addEventListener) {
    target.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>));
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  target: T | null,
  ...args: Parameters<T['removeEventListener']> | [string, Function | null, ...any]
) {
  if (target?.removeEventListener) {
    target.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>));
  }
}
