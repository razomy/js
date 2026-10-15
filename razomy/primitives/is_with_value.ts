import * as exceptions from '@razomy/exceptions';
import * as abstractions from '@razomy/abstractions';

export function isWithValue<T extends abstractions.structures.HasValue<T>>(node: T): node is T {
  if ('value' in node) {
    return true;
  }
  throw new exceptions.ArgumentException('data must have file name', node);
}
