import {Vrd, VrdOrValue} from 'razomy.vrd/vrd';
import {ValueRecursiveList, ValueRecursiveListOrValueItem} from 'razomy.list/value_recursive';
import {isString} from 'razomy.string/is_string';

export function vrlToVrd(dict: ValueRecursiveListOrValueItem<string> | string): VrdOrValue<string> {
  if (isString(dict)) {
    return dict;
  }

  const res = new Vrd<string>();
  for (const [key, v] of (dict as ValueRecursiveList<string>)) {
    res[key] = vrlToVrd(v);
  }
  return res;
}


