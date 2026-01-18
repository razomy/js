import {get} from 'razomy.kv';
import {ArrayOrKeyValuable, Valuable} from 'razomy.kv';

export function set<T>(value: ArrayOrKeyValuable<T, T>, path: T[], newValue: Valuable<T, T>): void {
  const parentPath = path.slice(0, -1);
  const parentNode = get(value, parentPath, 0);
  parentNode[1] = newValue;
}


