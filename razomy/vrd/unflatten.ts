import {assign} from 'razomy.key';

export function unflatten(data: Record<string, any>, assign_ = assign): Record<string, any> {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return data;
  }

  const regex = new RegExp(`\\${assign_}?([^${assign_}[\]]+)|\[(\d+)]`, 'g');
  const resultholder: Record<string, any> = {};
  for (const p in data) {
    let cur = resultholder;
    let prop = '';
    let m;
    while ((m = regex.exec(p))) {
      cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
      prop = m[2] || m[1];
    }
    cur[prop] = data[p];
  }

  return resultholder[''] || resultholder;
}
