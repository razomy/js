import {VrdOrValue} from 'razomy.vrd/vrd';
import is_vrd from 'src/vrd/is_vrd';

export interface ValueChildren<T> {
  value: T,
  children: ValueChildren<T>[]
}

export default function vrd_to_tree(vrd: VrdOrValue<string>): ValueChildren<string> | ValueChildren<string>[] {
  if (is_vrd(vrd)) {
    return Object.keys(vrd)
      .map(value => ({
        value,
        children: vrd_to_tree(vrd[value]) as []
      }));
  }
  return {value: vrd as string, children: []}
}
