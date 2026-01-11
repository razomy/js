import {ChangeDifference} from "razomy/difference/difference";

import {
  vrd,
  is_vrd,
  Vrd,
  VrdOrValue
} from "razomy/vrd/vrd";
import {equal_} from "razomy/equal/equal";
import {get_string} from "razomy/array/change/get";
import {get_similar} from 'razomy/array/change/get_similar';

export interface ReplaceDifference<T> {
  type: 'replace_key',
  old_value: T,
  value: T,
}


type P<T> = (ReplaceDifference<VrdOrValue<T>> | ChangeDifference<VrdOrValue<T>>) & {
  path: string
};

export function differences_dict<T>(
  diffs: P<T>[],
  a: Vrd<T>,
  b: Vrd<T>,
  path,
  separator = '/'
): P<T>[] {
  const a_keys = Object.keys(a);
  let b_keys = Object.keys(b);

  for (let old_key of a_keys) {
    if (b_keys.includes(old_key)) {
      differences_vrd(diffs, a[old_key], b[old_key], [path, old_key].filter(i => i).join(separator));
      b_keys = b_keys.filter(i => i != old_key);
      continue
    }

    let new_key: string | null = get_similar(old_key, b_keys);
    if (new_key) {
      diffs.push({
        type: "replace_key",
        path: path,
        old_value: vrd({[old_key]: a[old_key]}),
        value: vrd({[new_key]: b[new_key]})
      });
      b_keys = b_keys.filter(i => i != new_key);
      continue
    }

    diffs.push({type: "removed", path: path, value: vrd({[old_key]: a[old_key]})});
  }
  for (let new_key of b_keys) {
    diffs.push({type: "added", path: path, value: vrd({[new_key]: b[new_key]})});
  }
  return diffs;
}


export function differences_vrd<T>(
  diffs: P<T>[],
  a: VrdOrValue<T>,
  b: VrdOrValue<T>,
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

  const is_a = is_vrd(a);
  const is_b = is_vrd(b);

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
  const specs: [any, VrdOrValue<any>, VrdOrValue<any>, P<any>[]][] = [
    [[], null, null, []],
    [[], 'a', null, [{type: 'removed', path: '', value: 'a'}],],
    [[], null, 'b', [{type: 'added', path: '', value: 'b'}]],
    [[], 'a', 'b', [{type: 'replace', path: '', old_value: 'a', value: 'b'}]],
    [[], 'a', vrd({'b': null}), [{type: 'replace', path: '', old_value: 'a', value: {b: null}}]],
    [[], vrd({'a': null}), 'b', [{type: 'replace', path: '', old_value: {a: null}, value: 'b'}]],
    // -

    [[], vrd({'a': null}), vrd({}), [{type: 'removed', path: '', value: vrd({a: null})}],],
    [[], vrd({}), vrd({'b': null}), [{type: 'added', path: '', value: vrd({b: null})}]],
    [[], vrd({'a': null}), vrd({'b': null}), [
      {type: 'removed', path: '', value: vrd({a: null})},
      {type: 'added', path: '', value: vrd({b: null})}
    ]],
    // [[], d({'a': null}), d({'a1': null}), [
    //   {type: 'replace', old_value: d({a: null}), value: d({a1: null})},
    // ]],
    [[], vrd({'a': null}), vrd({'a': vrd({b: null})}), [
      {type: 'added', path: 'a', value: vrd({b: null})},
    ]],
  ]

  for (let spec of specs) {
    const result = differences_vrd(spec[0], spec[1], spec[2], '');
    console.log(equal_(result, spec[3]), result);
  }
}
