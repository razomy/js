import * as vrd from '@razomy/vrd';
import * as abstractions from '@razomy/abstractions';

export function getMatchesKey<T>(valueRecursive: vrd.VrdOrValue<T>, keys: string[]) {
  const matches = [] as abstractions.structure.Key[][];
  vrd.iterateSkip({ input: valueRecursive, parents: [] }, (ctx) => {
    for (const key of keys) {
      if (key === ctx.parents.at(-1)) {
        matches.push(ctx.parents);
        return false;
      }
    }
    return true;
  });
  return matches;
}
