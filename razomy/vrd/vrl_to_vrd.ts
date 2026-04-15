import * as string from '@razomy/string';
import * as kv from '@razomy/kv';
import * as kvRecursive from '@razomy/kv-recursive';
import * as vrd from '@razomy/vrd';

export function vrlToVrd(dict: kvRecursive.RecursiveList | string): vrd.VrdOrValue<string> {
  if (string.isString(dict)) {
    return dict;
  }

  const res = new vrd.Vrd<string>();
  for (const [key, v] of dict as kv.Kv<string, string>) {
    res[key] = vrlToVrd(v);
  }
  return res;
}
