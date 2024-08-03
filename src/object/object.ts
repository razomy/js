export function isObject<T>(obj: T): obj is T & object {
  return (typeof obj === 'object');
}
