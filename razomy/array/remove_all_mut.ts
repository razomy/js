import {removeFirstMut} from './remove_first_mut';

export function removeAllMut<T>(arr: T[], values: T[]): void {
  for (const arrKey of values) {
    removeFirstMut(arr, arrKey)
  }
}