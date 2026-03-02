import type { Dict } from '@razomy/dict';

export function isKeys<T>(obj: Dict<T>, keys: string[]): boolean {
  return keys.some((key) => key in obj);
}
