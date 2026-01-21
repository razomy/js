import {Vrd, VrdOrValue} from './vrd';

export function pathToVrd(path: string[]) {
  const root = new Vrd<null>();

  let last: VrdOrValue<null> = root;
  for (let i = 0; i < path.length - 1; i++) {
    let string = path[i];
    last[string] = new Vrd();
    last = last[string];
  }
  last[path[path.length - 1]] = null;
  return root;
}

