import * as exceptions from "@razomy/exceptions";

export function validateArrayStringThrow<T extends string[]>(array: T | null | undefined, name: string): T {
  function errorBuilder(t) {
    return `${name} is ${t}. Must be string[].`;
  }

  if (array === undefined) {
    throw new exceptions.ArgumentException(errorBuilder('undefined'), { [name]: 'undefined' });
  }
  if (array === null) {
    throw new exceptions.ArgumentException(errorBuilder('null'), { [name]: array });
  }
  if (!Array.isArray(array)) {
    throw new exceptions.ArgumentException(errorBuilder('not Array'), { [name]: array });
  }
  if (array.length === 0) {
    throw new exceptions.ArgumentException(errorBuilder('.length === 0'), { [name]: array });
  }
  return array;
}
