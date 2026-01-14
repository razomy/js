import {assign as key_assign} from "razomy.key/assign";

function flatten(data: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  function recurse(cur: any, prop: string, assign = key_assign) {
    if (typeof cur !== 'object' || cur === null) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (let i = 0; i < cur.length; i++) {
        recurse(cur[i], `${prop}[${i}]`);
      }
      if (cur.length === 0) {
        result[prop] = [];
      }
    } else {
      let is_empty = true;
      for (const p in cur) {
        if (Object.prototype.hasOwnProperty.call(cur, p)) {
          is_empty = false;
          recurse(cur[p], prop ? `${prop}${assign}${p}` : p);
        }
      }
      if (is_empty && prop) {
        result[prop] = {};
      }
    }
  }

  recurse(data, '');
  return result;
}

export function unflatten(data: Record<string, any>, assign = key_assign): Record<string, any> {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return data;
  }
  const regex = new RegExp(`\\${assign}?([^${assign}[\]]+)|\[(\d+)]`, 'g');
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

export default flatten;
