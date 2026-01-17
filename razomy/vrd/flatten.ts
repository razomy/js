import {assign} from 'razomy.key/assign';

export function flatten(data: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  function recurse(cur: any, prop: string, assign_ = assign) {
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
      let isEmpty = true;
      for (const p in cur) {
        if (Object.prototype.hasOwnProperty.call(cur, p)) {
          isEmpty = false;
          recurse(cur[p], prop ? `${prop}${assign_}${p}` : p);
        }
      }
      if (isEmpty && prop) {
        result[prop] = {};
      }
    }
  }

  recurse(data, '');
  return result;
}
