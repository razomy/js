import { Vrd, type VrdOrValue } from './vrd';
import { isObject } from '../object';
import * as dictRecursive from '@razomy/dict-recursive';

export function rdToVrd(
  dict: dictRecursive.DictRecursive,
  isValue: (t: dictRecursive.DictRecursive) => boolean = (i: dictRecursive.DictRecursive) => !isObject(i),
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
