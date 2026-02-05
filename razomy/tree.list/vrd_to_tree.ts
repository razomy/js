import {VrdOrValue} from '@razomy/vrd';
import {isVrd} from '@razomy/vrd';

export interface ValueChildren<T> {
  value: T,
  children: ValueChildren<T>[]
}

export function vrdToTree(vrd: VrdOrValue<string>): ValueChildren<string> | ValueChildren<string>[] {
  if (isVrd(vrd)) {
    return Object.keys(vrd)
      .map(value => ({
        value,
        children: vrdToTree(vrd[value]) as []
      }));
  }
  return {value: vrd as string, children: []}
}
