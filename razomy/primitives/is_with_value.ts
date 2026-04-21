import * as exceptions from '@razomy/exceptions';
import * as abstracts from '@razomy/abstracts';

export function isWithValue<T extends abstracts.domains.WithValue<T>>(node: T): node is T {
  if ('value' in node) {
    return true;
  }
  throw new exceptions.ArgumentException('data must have file name', node);
}
