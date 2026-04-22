import * as abstracts from '@razomy/abstracts';
import * as vrd from '@razomy/vrd';
import * as object_ from '@razomy/object';

export function rdToVrd(
  dict: abstracts.structures.RecursiveDict,
  isValue: (t: abstracts.structures.RecursiveDict) => boolean = (i: abstracts.structures.RecursiveDict) => !object_.isObject(i),
): vrd.VrdOrValue<string> {
  if (isValue(dict)) {
    return dict;
  }
  const v = new vrd.Vrd<string>();
  for (const dictKey in dict as object) {
    v[dictKey] = rdToVrd(dict[dictKey], isValue);
  }
  return v;
}
