import {is_vrd, Vrd, VrdOrValue} from "razomy/vrd/vrd";
import {isObject} from "razomy/object/object";
import {DictKey} from "razomy/dict/dict";

export function map_vrd<I, O>(input: Vrd<I>, leaf_value_cb: (input: I, parent: DictKey) => O, parent: DictKey): Vrd<O>;
export function map_vrd<I, O>(input: I, leaf_value_cb: (input: I, parent?: DictKey) => O, parent: DictKey): O;
export function map_vrd<I, O>(input: VrdOrValue<I>, leaf_value_cb: (input: I, parent: DictKey) => O, parent: DictKey): VrdOrValue<O> ;
export function map_vrd<I, O>(
  input: VrdOrValue<I>,
  leaf_value_cb: (input: I, parent: DictKey) => O,
  parent: DictKey,
  node_cb: ((input: Vrd<I>, parent: DictKey) => Vrd<O> | O),
): VrdOrValue<O>;
export function map_vrd<I, O>(
  input: VrdOrValue<I>,
  leaf_value_cb: (input: I, parent: DictKey) => O,
  parent: DictKey,
  node_cb: ((input: Vrd<I>, parent: DictKey) => Vrd<O> | O) | undefined = undefined,
): VrdOrValue<O> {
  if (is_vrd(input)) {
    let iter: any = input;
    if (node_cb) {
      iter = node_cb(iter, parent) as any;
      if (!is_vrd(iter)) {
        return iter;
      }
    }
    const otput: Vrd<O> = new Vrd<O>();
    for (let inputKey in iter) {
      const value = iter[inputKey];
      otput[inputKey] = map_vrd(value, leaf_value_cb, inputKey, node_cb!)
    }
    return otput;
  } else {
    return leaf_value_cb(input, parent)
  }
}
