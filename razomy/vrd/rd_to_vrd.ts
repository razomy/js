import * as abstractions from '@razomy/abstractions';
import * as vrd from '@razomy/vrd';
import * as object_ from '@razomy/object';

export function rdToVrd(
  dict: abstractions.structure.RecursiveDict,
  isValue: (t: abstractions.structure.RecursiveDict) => boolean = (i: abstractions.structure.RecursiveDict) => !object_.isObject(i),
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
