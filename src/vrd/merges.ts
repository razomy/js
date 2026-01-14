import merge_vrd from 'razomy.vrd/merge_vrd';

export default function merges<A, B>(a: A, b: B): A & B;
export default function merges<A, B, C>(a: A, b: B, c:C): A & B & C ;
export default function merges<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D ;
export default function merges<A, B, C, D, E>(a: A, b: B, c: C, d: D, e: E): A & B & C & D & E;
export default function merges<A, B, C, D, E, F>(a: A, b: B, c: C, d: D, e: E, f: F): A & B & C & D & E & F;
export default function merges<A, B, C, D, E, F, G>(a: A, b: B, c: C, d: D, e: E, f: F, g: G): A & B & C & D & E & F & G ;
export default function merges<A, B, C, D, E, F, G, H>(a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H): A & B & C & D & E & F & G & H ;
export default function merges(...args) {
  let res = args[0];
  for (let i = 1; i < args.length; i++) {
    res = merge_vrd(res, args[1], '')
  }
  return res;
}