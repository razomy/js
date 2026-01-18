import {VrdOrValue} from './vrd';
import {iterateSkip} from './iterate_skip';
import {DictKey} from 'razomy.dict';

export function getMatchesKey<T>(valueRecursive: VrdOrValue<T>, keys: string[]) {
  const matches = [] as DictKey[][];
  iterateSkip({input: valueRecursive, parents: []}, (ctx) => {
    for (let key of keys) {
      if (key === ctx.parents.at(-1)) {
        matches.push(ctx.parents);
        return false;
      }
    }
    return true;
  });
  return matches;
}
