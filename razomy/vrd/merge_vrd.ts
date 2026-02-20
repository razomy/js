import {Vrd, type VrdOrValue} from './vrd';
import {mergeDict} from './merge_dict';
import {isVrd} from './is_vrd';

export function mergeVrd<T>(a: VrdOrValue<T>, b: VrdOrValue<T>, empty: T): VrdOrValue<T> ;
export function mergeVrd<A, B>(a: A, b: B, empty: string | null): A & B ;
export function mergeVrd<T, A, B>(a: A, b: B, empty: T): A & B {
  if (!a) {
    return b as A & B;
  }
  if (!b) {
    return a as A & B;
  }

  const isA = isVrd(a);
  const isB = isVrd(b);

  if (isA) {
    if (isB) {
      return mergeDict(a, b, empty) as A & B;
    }
    a[b as string] = empty;
    return a as A & B;
  } else {
    if (isB) {
      b[a as string] = empty;
      return b as A & B;
    }
    return new Vrd({[a as string]: '', [b as string]: ''}) as A & B;
  }
}


