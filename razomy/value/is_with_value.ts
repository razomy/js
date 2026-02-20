import {ArgumentException} from '@razomy/exceptions';
import type {WithValue} from '@razomy/value';

export function isWithValue<T extends WithValue<T>>(node: T): node is T {
  if ('value' in node) {
    return true;
  }
  throw new ArgumentException('data must have file name', node);
}


