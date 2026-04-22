import * as vrd from '@razomy/vrd';
import * as abstracts from '@razomy/abstracts';

export function getMatchesKey<T>(valueRecursive: vrd.VrdOrValue<T>, keys: string[]) {
  const matches = [] as abstracts.structures.Key[][];
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
