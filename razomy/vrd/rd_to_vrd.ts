import {Vrd, VrdOrValue} from 'razomy.vrd/vrd';
import {RecursiveDict} from 'razomy.dict/recursive/recursive';

export function rdToVrd(dict: RecursiveDict, isValue: (t: RecursiveDict) => boolean): VrdOrValue<string> {
  if (isValue(dict)) {
    return dict;
  }
  const v = new Vrd<string>();
  for (const dictKey in (dict as object)) {
    v[dictKey] = rdToVrd(dict[dictKey], isValue);
  }
  return v;
}
