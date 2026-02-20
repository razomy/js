import {Vrd, type VrdOrValue} from './vrd';
import type {RecursiveDict} from '@razomy/dict-recursive';
import {isObject} from '../object';

export function rdToVrd(dict: RecursiveDict,
                        isValue: (t: RecursiveDict) => boolean = (i: RecursiveDict) => !isObject(i)): VrdOrValue<string> {
  if (isValue(dict)) {
    return dict;
  }
  const v = new Vrd<string>();
  for (const dictKey in (dict as object)) {
    v[dictKey] = rdToVrd(dict[dictKey], isValue);
  }
  return v;
}
