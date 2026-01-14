import {Vrd} from "razomy.vrd/vrd";

function path_to_vrd<T>(path: string[]) {
  const res = new Vrd<T>();

  let last = res;
  for (let string of path) {
    last[string] = new Vrd();
    last = last[string];
  }

  return res;
}

export default path_to_vrd;
