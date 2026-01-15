import { assign} from 'razomy.key/assign';
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
      let is_empty = true;
      for (const p in cur) {
        if (Object.prototype.hasOwnProperty.call(cur, p)) {
          is_empty = false;
          recurse(cur[p], prop ? `${prop}${assign_}${p}` : p);
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



export * from './unflatten';