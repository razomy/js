import {Vrd, VrdOrValue} from 'razomy.vrd/vrd';
import {merge_dict} from 'razomy.vrd/merge_dict';
import {is_vrd} from './is_vrd';

export function merge_vrd<T>(a: VrdOrValue<T>, b: VrdOrValue<T>, empty: T): VrdOrValue<T> ;
export function merge_vrd<A, B>(a: A, b: B, empty: string): A & B ;
export function merge_vrd<T, A, B>(a: A, b: B, empty: T): A & B {
  if (!a) {
    return b as A & B;
  }
  if (!b) {
    return a as A & B;
  }

  const is_a = is_vrd(a);
  const is_b = is_vrd(b);

  if (is_a) {
    if (is_b) {
      return merge_dict(a, b, empty) as A & B;
    }
    a[b as string] = empty;
    return a as A & B;
  } else {
    if (is_b) {
      b[a as string] = empty;
      return b as A & B;
    }
    return new Vrd({[a as string]: '', [b as string]: ''}) as A & B;
  }
}


