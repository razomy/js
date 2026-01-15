import  { vrd,Vrd} from './vrd';
import  { differences_vrd,P} from './differences_vrd';
import {get_similar} from 'razomy.array/difference/get_similar';

export function differences_dict<T>(
  diffs: P<T>[],
  a: Vrd<T>,
  b: Vrd<T>,
  path,
  separator = '/'
): P<T>[] {
  const a_keys = Object.keys(a);
  let b_keys = Object.keys(b);

  for (let old_key of a_keys) {
    if (b_keys.includes(old_key)) {
      differences_vrd(diffs, a[old_key], b[old_key], [path, old_key].filter(i => i).join(separator));
      b_keys = b_keys.filter(i => i != old_key);
      continue
    }

    let new_key: string | null = get_similar(old_key, b_keys);
    if (new_key) {
      diffs.push({
        type: 'replace_key',
        path: path,
        old_value: vrd({[old_key]: a[old_key]}),
        value: vrd({[new_key]: b[new_key]})
      });
      b_keys = b_keys.filter(i => i != new_key);
      continue
    }

    diffs.push({type: 'removed', path: path, value: vrd({[old_key]: a[old_key]})});
  }
  for (let new_key of b_keys) {
    diffs.push({type: 'added', path: path, value: vrd({[new_key]: b[new_key]})});
  }
  return diffs;
}