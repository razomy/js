import {createByPath} from 'razomy.kv';
import {set} from 'razomy.kv';
import {ArrayKeyValuable} from 'razomy.kv';
import {get} from './get';

export function getWithPath<T>(valueRecursive: ArrayKeyValuable<T, T>, path: T[]) {
  const pathed = createByPath(path) as ArrayKeyValuable<T, T>;
  const node = get(valueRecursive, path, 0);
  set(pathed, path, node);
  return pathed;
}
