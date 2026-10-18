export function nLogN(n: number) {
  return n > 0 ? n * Math.log2(n) : 0;
}
