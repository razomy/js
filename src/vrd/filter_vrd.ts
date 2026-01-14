import {is_vrd, Vrd, VrdOrValue} from "razomy/vrd/vrd";
import {DictKey} from "razomy/dict/dict";

function filter_vrd<I>(input: Vrd<I>, is_keep: (input: VrdOrValue<I>, parent: DictKey) => boolean): Vrd<I>;
function filter_vrd<I>(input: I, is_keep: (input: VrdOrValue<I>, parent: DictKey) => boolean): I;
function filter_vrd<I>(input: VrdOrValue<I>, is_keep: (input: VrdOrValue<I>, parent: DictKey) => boolean): VrdOrValue<I> ;
function filter_vrd<I>(input: VrdOrValue<I>, is_keep: (input: VrdOrValue<I>, parent: DictKey) => boolean): VrdOrValue<I> {
  if (is_vrd(input)) {
    for (let input_key in input) {
      const value = input[input_key];
      if (!is_keep(value, input_key)) {
        delete input[input_key];
        continue;
      }
      input[input_key] = filter_vrd(value, is_keep);
    }
    return input;
  } else {
    return input;
  }
}

export default filter_vrd;
