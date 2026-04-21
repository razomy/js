import * as key from '@razomy/dict';
import {vrd} from "./vrd";

export function unflatten(data: Record<string, any>, assign = key.ASSIGN): Record<string, any> {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return data;
  }

  const regex = new RegExp(`\\${assign}?([^${assign}\\[\\]]+)|\\[(\\d+)\\]`, 'g');
  const resultholder: Record<string, any> = vrd({});
  for (const p in data) {
    let cur = resultholder;
    let prop = '';
    let m;
    while ((m = regex.exec(p))) {
      cur = cur[prop] || (cur[prop] = m[2] ? [] : vrd({}));
      prop = m[2] || m[1];
    }
    cur[prop] = data[p];
  }

  return resultholder[''] || resultholder;
}
