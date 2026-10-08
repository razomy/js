export function isError<T = Error>(val: any): val is T {
  return val instanceof Error;
}
