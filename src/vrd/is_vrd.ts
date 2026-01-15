import {Vrd, VrdOrValue} from './vrd';

export function is_vrd<T>(obj: VrdOrValue<T>): obj is Vrd<T> {
  return obj instanceof Vrd;
}