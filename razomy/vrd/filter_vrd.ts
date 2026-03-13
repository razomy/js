import { Vrd, type VrdOrValue } from './vrd';
import { isVrd } from './is_vrd';
import * as dict from '@razomy/dict';

export function filterVrd<I>(input: Vrd<I>, isKeep: (input: VrdOrValue<I>, parent: dict.DictKey) => boolean): Vrd<I>;
export function filterVrd<I>(input: I, isKeep: (input: VrdOrValue<I>, parent: dict.DictKey) => boolean): I;
export function filterVrd<I>(
  input: VrdOrValue<I>,
  isKeep: (input: VrdOrValue<I>, parent: dict.DictKey) => boolean,
): VrdOrValue<I>;
export function filterVrd<I>(
  input: VrdOrValue<I>,
  isKeep: (input: VrdOrValue<I>, parent: dict.DictKey) => boolean,
): VrdOrValue<I> {
  if (isVrd(input)) {
    for (const inputKey in input) {
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
