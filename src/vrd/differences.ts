import {ChangeDifference} from "razomy.js/difference/difference";

import {
  d,
  is_value_recursion,
  ValueRecursiveDict,
  ValueRecursiveDictOrValue
} from "razomy.js/vrd/value";
import {equal_} from "razomy.js/equal/equal";
import {get_similar, get_string} from "razomy.js/array/change/get";

export interface ReplaceDifference<T> {
  type: 'replace_key',
  old_value: T,
  value: T,
}


type P<T> = (ReplaceDifference<ValueRecursiveDictOrValue<T>> | ChangeDifference<ValueRecursiveDictOrValue<T>>) & {
  path: string
};

export function differences_dict<T>(
  diffs: P<T>[],
  a: ValueRecursiveDict<T>,
  b: ValueRecursiveDict<T>,
  path,
  separator = '/'
): P<T>[] {
  const a_keys = Object.keys(a);
  let b_keys = Object.keys(b);

  for (let old_key of a_keys) {
    if (b_keys.includes(old_key)) {
      differences(diffs, a[old_key], b[old_key], [path, old_key].filter(i => i).join(separator));
      b_keys = b_keys.filter(i => i != old_key);
      continue
    }

    let new_key: string | null = get_similar(old_key, b_keys);
    if (new_key) {
      diffs.push({
        type: "replace_key",
        path: path,
        old_value: d({[old_key]: a[old_key]}),
        value: d({[new_key]: b[new_key]})
      });
      b_keys = b_keys.filter(i => i != new_key);
      continue
    }

    diffs.push({type: "removed", path: path, value: d({[old_key]: a[old_key]})});
  }
  for (let new_key of b_keys) {
    diffs.push({type: "added", path: path, value: d({[new_key]: b[new_key]})});
  }
  return diffs;
}


export function differences<T>(
  diffs: P<T>[],
  a: ValueRecursiveDictOrValue<T>,
  b: ValueRecursiveDictOrValue<T>,
  path: string): P<T>[] {
  if (!a && !b) {
    return diffs;
  } else if (!a) {
    diffs.push({type: "added", path: path, value: b});
    return diffs;
  } else if (!b) {
    diffs.push({type: "removed", path: path, value: a});
    return diffs;
  }

  const is_a = is_value_recursion(a);
  const is_b = is_value_recursion(b);

  if (is_a) {
    if (is_b) {
      return differences_dict(diffs, a, b, path);
    }
    diffs.push({type: "replace", path: path, old_value: a, value: b});
    return diffs;
  } else {
    if (is_b) {
      diffs.push({type: "replace", path: path, old_value: a, value: b});
      return diffs;
    }

    if (!equal_(a, b)) {
      diffs.push({type: "replace", path: path, old_value: a, value: b});
    }
    return diffs;
  }
}

function test() {
  const specs: [any, ValueRecursiveDictOrValue<any>, ValueRecursiveDictOrValue<any>, P<any>[]][] = [
    [[], null, null, []],
    [[], 'a', null, [{type: 'removed', path: '', value: 'a'}],],
    [[], null, 'b', [{type: 'added', path: '', value: 'b'}]],
    [[], 'a', 'b', [{type: 'replace', path: '', old_value: 'a', value: 'b'}]],
    [[], 'a', d({'b': null}), [{type: 'replace', path: '', old_value: 'a', value: {b: null}}]],
    [[], d({'a': null}), 'b', [{type: 'replace', path: '', old_value: {a: null}, value: 'b'}]],
    // -

    [[], d({'a': null}), d({}), [{type: 'removed', path: '', value: d({a: null})}],],
    [[], d({}), d({'b': null}), [{type: 'added', path: '', value: d({b: null})}]],
    [[], d({'a': null}), d({'b': null}), [
      {type: 'removed', path: '', value: d({a: null})},
      {type: 'added', path: '', value: d({b: null})}
    ]],
    // [[], d({'a': null}), d({'a1': null}), [
    //   {type: 'replace', old_value: d({a: null}), value: d({a1: null})},
    // ]],
    [[], d({'a': null}), d({'a': d({b: null})}), [
      {type: 'added', path: 'a', value: d({b: null})},
    ]],
  ]

  for (let spec of specs) {
    const result = differences(spec[0], spec[1], spec[2], '');
    console.log(equal_(result, spec[3]), result);
  }
}
