import type {ChangeDifference} from '@razomy/difference';
import type {VrdOrValue} from './vrd';
import {equal} from '@razomy/equal';
import {isVrd} from './is_vrd';
import {differencesDict} from './differences_dict';

export interface ReplaceDifference<T> {
  type: 'replace_key',
  oldValue: T,
  value: T,
}


export type P<T> = (ReplaceDifference<VrdOrValue<T>> | ChangeDifference<VrdOrValue<T>>) & {
  path: string
};


export function differencesVrd<T>(
  diffs: P<T>[],
  a: VrdOrValue<T>,
  b: VrdOrValue<T>,
  path: string): P<T>[] {
  if (!a && !b) {
    return diffs;
  } else if (!a) {
    diffs.push({type: 'added', path: path, value: b});
    return diffs;
  } else if (!b) {
    diffs.push({type: 'removed', path: path, value: a});
    return diffs;
  }

  const isA = isVrd(a);
  const isB = isVrd(b);

  if (isA) {
    if (isB) {
      return differencesDict(diffs, a, b, path);
    }
    diffs.push({type: 'replace', path: path, oldValue: a, value: b});
    return diffs;
  } else {
    if (isB) {
      diffs.push({type: 'replace', path: path, oldValue: a, value: b});
      return diffs;
    }

    if (!equal(a, b)) {
      diffs.push({type: 'replace', path: path, oldValue: a, value: b});
    }
    return diffs;
  }
}
