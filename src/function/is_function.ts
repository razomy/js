export function is_function<T>(function_: unknown): function_ is T {
  return typeof function_ === 'function';
}

export default is_function;
