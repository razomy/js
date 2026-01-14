import { VrdOrValue } from "razomy.vrd/vrd";
import { iterate_skip } from "razomy.vrd/iterate_vrd";
import { DictKey } from "razomy.dict/dict";

export function get_matches_key<T>(value_recursive: VrdOrValue<T>, keys: string[]) {
    const matches = [] as DictKey[][];
    iterate_skip({input: value_recursive, parents: []}, (ctx) => {
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
