import {createByPath} from 'razomy.kv/create_by_path';
import {set} from 'razomy.kv/set';
import {ArrayKeyValuable} from 'razomy.kv/kv';
import {get} from './get';

export function getWithPath<T>(valueRecursive: ArrayKeyValuable<T, T>, path: T[]) {
  const pathed = createByPath(path) as ArrayKeyValuable<T, T>;
  const node = get(valueRecursive, path, 0);
  set(pathed, path, node);
  return pathed;
}
