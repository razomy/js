import {Vrd} from './vrd';

export function pathToVrd<T>(path: string[]) {
  const res = new Vrd<T>();

  let last = res;
  for (let string of path) {
    last[string] = new Vrd();
    last = last[string];
  }

  return res;
}


