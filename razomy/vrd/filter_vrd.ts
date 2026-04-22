import * as abstracts from '@razomy/abstracts';
import * as vrd from '@razomy/vrd';

export function filterVrd<I>(
  input: vrd.Vrd<I>,
  isKeep: (input: vrd.VrdOrValue<I>, parent: abstracts.structures.Key) => boolean,
): vrd.Vrd<I>;
export function filterVrd<I>(input: I, isKeep: (input: vrd.VrdOrValue<I>, parent: abstracts.structures.Key) => boolean): I;
export function filterVrd<I>(
  input: vrd.VrdOrValue<I>,
  isKeep: (input: vrd.VrdOrValue<I>, parent: abstracts.structures.Key) => boolean,
): vrd.VrdOrValue<I>;
export function filterVrd<I>(
  input: vrd.VrdOrValue<I>,
  isKeep: (input: vrd.VrdOrValue<I>, parent: abstracts.structures.Key) => boolean,
): vrd.VrdOrValue<I> {
  if (vrd.isVrd(input)) {
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
