import { Vrd, type VrdOrValue } from './vrd';
import { isString } from '@razomy/string';
import { Kv } from '@razomy/kv';

export function vrlToVrd(dict: Kv<string, string> | string): VrdOrValue<string> {
  if (isString(dict)) {
    return dict;
  }

  const res = new Vrd<string>();
  for (const [key, v] of dict as Kv<string, string>) {
    res[key] = vrlToVrd(v);
  }
  return res;
}
