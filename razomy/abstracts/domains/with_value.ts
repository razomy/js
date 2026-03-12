import type { Value } from './value';

export interface WithValue<T> {
  value: Value<T>;
}
