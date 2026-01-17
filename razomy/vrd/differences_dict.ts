import {vrd, Vrd} from './vrd';
import {differencesVrd, P} from './differences_vrd';
import {getSimilar} from 'razomy.array/difference/get_similar';

export function differencesDict<T>(
  diffs: P<T>[],
  a: Vrd<T>,
  b: Vrd<T>,
  path,
  separator = '/'
): P<T>[] {
  const aKeys = Object.keys(a);
  let bKeys = Object.keys(b);

  for (let oldKey of aKeys) {
    if (bKeys.includes(oldKey)) {
      differencesVrd(diffs, a[oldKey], b[oldKey], [path, oldKey].filter(i => i).join(separator));
      bKeys = bKeys.filter(i => i != oldKey);
      continue
    }

    let newKey: string | null = getSimilar(oldKey, bKeys);
    if (newKey) {
      diffs.push({
        type: 'replace_key',
        path: path,
        oldValue: vrd({[oldKey]: a[oldKey]}),
        value: vrd({[newKey]: b[newKey]})
      });
      bKeys = bKeys.filter(i => i != newKey);
      continue
    }

    diffs.push({type: 'removed', path: path, value: vrd({[oldKey]: a[oldKey]})});
  }
  for (let newKey of bKeys) {
    diffs.push({type: 'added', path: path, value: vrd({[newKey]: b[newKey]})});
  }
  return diffs;
}