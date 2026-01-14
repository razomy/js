import {is_vrd, VrdOrValue} from 'razomy.vrd/vrd';

interface ValueChildren<T> {
  value: T,
  children: ValueChildren<T>[]
}

function vrd_to_tree(vrd: VrdOrValue<string>): ValueChildren<string> | ValueChildren<string>[] {
  if (is_vrd(vrd)) {
    return Object.keys(vrd)
      .map(value => ({
        value,
        children: vrd_to_tree(vrd[value]) as []
      }));
  }
  return {value: vrd as string, children: []}
}
