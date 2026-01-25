import {mergeDicts} from 'razomy.dict';

export interface Context {
}

export function createContext<T extends readonly Record<PropertyKey, unknown>[]>(
  ...array: [...T]
) {
  return mergeDicts(array);
}
