import * as vrd from '@razomy/vrd';

export function mergeVrd<T>(a: vrd.VrdOrValue<T>, b: vrd.VrdOrValue<T>, empty: T): vrd.VrdOrValue<T>;
export function mergeVrd<A, B>(a: A, b: B, empty: string | null): A & B;
export function mergeVrd<T, A, B>(a: A, b: B, empty: T): A & B {
  if (!a) {
    return b as A & B;
  }
  if (!b) {
    return a as A & B;
  }

  const isA = vrd.isVrd(a);
  const isB = vrd.isVrd(b);

  if (isA) {
    if (isB) {
      return vrd.mergeDict(a, b, empty) as A & B;
    }
    a[b as string] = empty;
    return a as A & B;
  } else {
    if (isB) {
      b[a as string] = empty;
      return b as A & B;
    }
    return new vrd.Vrd({ [a as string]: '', [b as string]: '' }) as A & B;
  }
}
