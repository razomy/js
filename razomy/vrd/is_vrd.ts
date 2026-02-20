import {Vrd, type VrdOrValue} from './vrd';

export function isVrd<T>(obj: VrdOrValue<T>): obj is Vrd<T> {
  return obj instanceof Vrd;
}