import {Vrd, type VrdOrValue} from './vrd';
import type {DictKey} from '@razomy/dict';
import {isVrd} from './is_vrd';

export function filterVrd<I>(input: Vrd<I>, isKeep: (input: VrdOrValue<I>, parent: DictKey) => boolean): Vrd<I>;
export function filterVrd<I>(input: I, isKeep: (input: VrdOrValue<I>, parent: DictKey) => boolean): I;
export function filterVrd<I>(input: VrdOrValue<I>, isKeep: (input: VrdOrValue<I>, parent: DictKey) => boolean): VrdOrValue<I> ;
export function filterVrd<I>(input: VrdOrValue<I>, isKeep: (input: VrdOrValue<I>, parent: DictKey) => boolean): VrdOrValue<I> {
  if (isVrd(input)) {
    for (let inputKey in input) {
      const value = input[inputKey];
      if (!isKeep(value, inputKey)) {
        delete input[inputKey];
        continue;
      }
      input[inputKey] = filterVrd(value, isKeep);
    }
    return input;
  } else {
    return input;
  }
}


