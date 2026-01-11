import {is_vrd, Vrd, VrdOrValue} from "razomy/vrd/vrd";
import {DictKey} from "razomy/dict/dict";

export function filter_vrd<I>(input: Vrd<I>, is_keep: (input: VrdOrValue<I>, parent: DictKey) => boolean): Vrd<I>;
export function filter_vrd<I>(input: I, is_keep: (input: VrdOrValue<I>, parent: DictKey) => boolean): I;
export function filter_vrd<I>(input: VrdOrValue<I>, is_keep: (input: VrdOrValue<I>, parent: DictKey) => boolean): VrdOrValue<I> ;
export function filter_vrd<I>(input: VrdOrValue<I>, is_keep: (input: VrdOrValue<I>, parent: DictKey) => boolean): VrdOrValue<I> {
  if (is_vrd(input)) {
    for (let inputKey in input) {
      const value = input[inputKey];
      if (!is_keep(value, inputKey)) {
        delete input[inputKey];
        continue;
      }
      input[inputKey] = filter_vrd(value, is_keep);
    }
    return input;
  } else {
    return input;
  }
}

