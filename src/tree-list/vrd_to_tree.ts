import * as vrd_ from '@razomy/vrd';

export interface ValueChildren<T> {
  value: T;
  children: ValueChildren<T>[];
}

export function vrdToTree(vrd: vrd_.VrdOrValue<string>): ValueChildren<string> | ValueChildren<string>[] {
  if (vrd_.isVrd(vrd)) {
    return Object.keys(vrd).map((value) => ({
      value,
      children: vrdToTree(vrd[value]) as [],
    }));
  }
  return { value: vrd as string, children: [] };
}
