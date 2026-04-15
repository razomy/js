import * as dict from '@razomy/dict';
import * as vrd from "@razomy/vrd";

export function mapVrd<I, O>(
  input: vrd.Vrd<I>,
  leafValueCb: (input: I, parent: dict.DictKey) => O,
  parent: dict.DictKey,
): vrd.Vrd<O>;
export function mapVrd<I, O>(input: I, leafValueCb: (input: I, parent?: dict.DictKey) => O, parent: dict.DictKey): O;
export function mapVrd<I, O>(
  input: vrd.VrdOrValue<I>,
  leafValueCb: (input: I, parent: dict.DictKey) => O,
  parent: dict.DictKey,
): vrd.VrdOrValue<O>;
export function mapVrd<I, O>(
  input: vrd.VrdOrValue<I>,
  leafValueCb: (input: I, parent: dict.DictKey) => O,
  parent: dict.DictKey,
  nodeCb: (input: vrd.Vrd<I>, parent: dict.DictKey) => vrd.Vrd<O> | O,
): vrd.VrdOrValue<O>;
export function mapVrd<I, O>(
  input: vrd.VrdOrValue<I>,
  leafValueCb: (input: I, parent: dict.DictKey) => O,
  parent: dict.DictKey,
  nodeCb: ((input: vrd.Vrd<I>, parent: dict.DictKey) => vrd.Vrd<O> | O) | undefined = undefined,
): vrd.VrdOrValue<O> {
  if (vrd.isVrd(input)) {
    let iter: any = input;
    if (nodeCb) {
      iter = nodeCb(iter, parent) as any;
      if (!vrd.isVrd(iter)) {
        return iter;
      }
    }
    const otput: vrd.Vrd<O> = new vrd.Vrd<O>();
    for (const inputKey in iter) {
      const value = iter[inputKey];
      otput[inputKey] = mapVrd(value, leafValueCb, inputKey, nodeCb!);
    }
    return otput;
  } else {
    return leafValueCb(input, parent);
  }
}
