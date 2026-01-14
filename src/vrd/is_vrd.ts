import {Vrd, VrdOrValue} from './vrd';

export default function is_vrd<T>(obj: VrdOrValue<T>): obj is Vrd<T> {
  return obj instanceof Vrd;
}