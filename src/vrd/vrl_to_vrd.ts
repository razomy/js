import {Vrd, VrdOrValue} from 'razomy.vrd/vrd';
import {ValueRecursiveList, ValueRecursiveListOrValueItem} from 'razomy.list/value_recursive/value';
import {is_string} from 'razomy.string/is_string';
export function vrl_to_vrd(dict: ValueRecursiveListOrValueItem<string> | string): VrdOrValue<string> {
  if (is_string(dict)) {
    return dict;
  }

  const res = new Vrd<string>();
  for (const [key, v] of (dict as ValueRecursiveList<string>)) {
    res[key] = vrl_to_vrd(v);
  }
  return res;
}


