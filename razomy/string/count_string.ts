import type { String } from '@razomy/string';
import type { Number } from '@razomy/number';

export function countString(strings: String[], equalString: String, offset: Number, maxOffset: Number): Number {
  let result = 0;
  for (let i = offset; i < maxOffset; i++) {
    if (strings[i] === equalString) {
      result++;
    }
  }
  return result;
}
