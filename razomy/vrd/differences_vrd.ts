import * as difference from '@razomy/difference';
import * as vrd from '@razomy/vrd';
import * as dict from '@razomy/dict';

export interface ReplaceDifference<T> {
  type: 'replace_key';
  oldValue: T;
  value: T;
}

export type P<T> = (ReplaceDifference<vrd.VrdOrValue<T>> | difference.ChangeDifference<vrd.VrdOrValue<T>>) & {
  path: string;
};

export function differencesVrd<T>(diffs: P<T>[], a: vrd.VrdOrValue<T>, b: vrd.VrdOrValue<T>, path: string): P<T>[] {
  if (!a && !b) {
    return diffs;
  } else if (!a) {
    diffs.push({ type: 'added', path: path, value: b });
    return diffs;
  } else if (!b) {
    diffs.push({ type: 'removed', path: path, value: a });
    return diffs;
  }

  const isA = vrd.isVrd(a);
  const isB = vrd.isVrd(b);

  if (isA) {
    if (isB) {
      return vrd.differencesDict(diffs, a, b, path);
    }
    diffs.push({ type: 'replace', path: path, oldValue: a, value: b });
    return diffs;
  } else {
    if (isB) {
      diffs.push({ type: 'replace', path: path, oldValue: a, value: b });
      return diffs;
    }

    if (!dict.isEqual(a, b)) {
      diffs.push({ type: 'replace', path: path, oldValue: a, value: b });
    }
    return diffs;
  }
}
