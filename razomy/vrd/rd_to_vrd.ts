import * as dictRecursive from '@razomy/dict-recursive';
import * as vrd from '@razomy/vrd';
import * as object_ from '@razomy/object';

export function rdToVrd(
  dict: dictRecursive.RecursiveDict,
  isValue: (t: dictRecursive.RecursiveDict) => boolean = (i: dictRecursive.RecursiveDict) => !object_.isObject(i),
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
