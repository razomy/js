import {createInt} from './create_int';

export function pickItem <T> (array: T[]) : T | undefined {
  if (array.length === 0) return undefined;
  return array[createInt(0, array.length - 1)];
}