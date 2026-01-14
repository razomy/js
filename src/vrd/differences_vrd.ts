import {ChangeDifference} from 'razomy.difference/type';
import {VrdOrValue} from 'razomy.vrd/vrd';
import equal_ from 'razomy.equal/equal';
import is_vrd from './is_vrd';
import differences_dict from './differences_dict';

export interface ReplaceDifference<T> {
  type: 'replace_key',
  old_value: T,
  value: T,
}


export type P<T> = (ReplaceDifference<VrdOrValue<T>> | ChangeDifference<VrdOrValue<T>>) & {
  path: string
};


export default function differences_vrd<T>(
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



export * from './test';