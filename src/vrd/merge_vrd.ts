import {is_vrd, Vrd, VrdOrValue} from "razomy.js/vrd/vrd";

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


export function merges<A, B>(a: A, b: B): A & B;
export function merges<A, B, C>(a: A, b: B, c:C): A & B & C ;
export function merges<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D ;
export function merges<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;
export function merges<A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E, f: F): A & B & C & D & E & F;
export function merges<A, B, C, D, E, F, G>(a: A, b: B, c: C, d: D, e: E, f: F, g: G): A & B & C & D & E & F & G ;
export function merges<A, B, C, D, E, F, G, H>(a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H): A & B & C & D & E & F & G & H ;
export function merges(...args) {
  let res = args[0];
  for (let i = 1; i < args.length; i++) {
    res = merge_vrd(res, args[1], '')
  }
  return res;
}


export function merge_dict<T>(a: Vrd<T>, b: Vrd<T>, empty: T): Vrd<T> {
  const a_keys = Object.keys(a);
  const b_keys = Object.keys(b);
  const all_keys = new Set([...a_keys, ...b_keys]);
  for (let key of all_keys) {
    a[key] = merge_vrd(a[key], b[key], empty);
  }
  return a;
}
