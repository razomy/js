export function isFunction<T>(function_: unknown): function_ is T {
  return typeof function_ === 'function';
}


