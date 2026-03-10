import { Vrd, type VrdOrValue } from './vrd';
import type { DictRecursive } from '@razomy/dict-recursive';
import { isObject } from '../object';

export function rdToVrd(
  dict: DictRecursive,
  isValue: (t: DictRecursive) => boolean = (i: DictRecursive) => !isObject(i),
): VrdOrValue<string> {
  if (isValue(dict)) {
    return dict;
  }
  const v = new Vrd<string>();
  for (const dictKey in dict as object) {
    v[dictKey] = rdToVrd(dict[dictKey], isValue);
  }
  return v;
}
