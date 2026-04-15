import * as performance from '@razomy/performance';

export function arrayN(arr: any[]) {
  return performance.bigO.n(arr.length);
}
