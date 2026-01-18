import {Vrd, VrdOrValue} from './vrd';
import {getVrd} from './get_vrd';

export function setVrd<T>(value: VrdOrValue<T>, path: string[], newValue: VrdOrValue<T>): void {
  const parentPath = path.slice(0, -1);
  let parentNode: Vrd<T>;
  if (parentPath.length !== 0) {
    parentNode = getVrd(value, parentPath, 0) as Vrd<T>;
  } else {
    parentNode = value as Vrd<T>;
  }
  parentNode[path.at(-1)!] = newValue;
}


