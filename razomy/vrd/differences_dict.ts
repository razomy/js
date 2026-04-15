import * as arrayDifference from '@razomy/array-difference';
import * as vrd from "@razomy/vrd";

export function differencesDict<T>(diffs: vrd.P<T>[], a: vrd.Vrd<T>, b: vrd.Vrd<T>, path, separator = '/'): vrd.P<T>[] {
  const aKeys = Object.keys(a);
  let bKeys = Object.keys(b);

  for (const oldKey of aKeys) {
    if (bKeys.includes(oldKey)) {
      vrd.differencesVrd(diffs, a[oldKey], b[oldKey], [path, oldKey].filter((i) => i).join(separator));
      bKeys = bKeys.filter((i) => i != oldKey);
      continue;
    }

    const newKey: string | null = arrayDifference.getSimilar(oldKey, bKeys);
    if (newKey) {
      diffs.push({
        type: 'replace_key',
        path: path,
        oldValue: vrd.vrd({ [oldKey]: a[oldKey] }),
        value: vrd.vrd({ [newKey]: b[newKey] }),
      });
      bKeys = bKeys.filter((i) => i != newKey);
      continue;
    }

    diffs.push({ type: 'removed', path: path, value: vrd.vrd({ [oldKey]: a[oldKey] }) });
  }
  for (const newKey of bKeys) {
    diffs.push({ type: 'added', path: path, value: vrd.vrd({ [newKey]: b[newKey] }) });
  }
  return diffs;
}
