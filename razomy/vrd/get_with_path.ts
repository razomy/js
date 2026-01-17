import {VrdOrValue} from 'razomy.vrd/vrd';
import {pathToVrd} from 'razomy.vrd/path_to_vrd';
import {setVrd} from 'razomy.vrd/set_vrd';
import {getVrd} from './get_vrd';

export function getWithPath<T>(valueRecursive: VrdOrValue<T>, path: string[]) {
  const pathed = pathToVrd(path);
  const node = getVrd(valueRecursive, path, 0);
  setVrd(pathed, path, node);
  return pathed;
}
