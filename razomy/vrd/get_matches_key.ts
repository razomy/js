import * as dict from '@razomy/dict';
import * as vrd from '@razomy/vrd';

export function getMatchesKey<T>(valueRecursive: vrd.VrdOrValue<T>, keys: string[]) {
  const matches = [] as dict.DictKey[][];
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
