import type {VrdOrValue} from './vrd';
import {pathToVrd} from './path_to_vrd';
import {setVrd} from './set_vrd';
import {getVrd} from './get_vrd';

export function getWithPath<T>(valueRecursive: VrdOrValue<T>, path: string[]) {
  const pathed = pathToVrd(path);
  const node = getVrd(valueRecursive, path, 0);
  setVrd(pathed, path, node);
  return pathed;
}
