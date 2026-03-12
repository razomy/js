import * as random from "@razomy/random";

export function pickItem<T>(array: readonly T[]): T {
  if (array.length === 0) {
    throw new RangeError('Cannot pick an item from an empty array');
  }

  return array[random.createInt(0, array.length - 1)];
}
