import { VrdOrValue } from 'razomy.vrd/vrd';
import * as vrd from 'razomy.vrd';
import { DictKey } from 'razomy.dict/dict';
export function get_matches_key<T>(value_recursive: VrdOrValue<T>, keys: string[]) {
    const matches = [] as DictKey[][];
  vrd.iterate_skip({input: value_recursive, parents: []}, (ctx) => {
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
