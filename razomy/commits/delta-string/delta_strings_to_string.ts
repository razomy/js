import * as commitsDeltaString from '@razomy/commits/delta-string';
import * as string from '@razomy/string';

export function deltaStringsToString(prevSnapshot: string, changes: commitsDeltaString.DeltaString[]): string {
  for (let j = 0; j < changes.length; j++) {
    const change = changes[j];
    if ('removeLength' in change) {
      prevSnapshot = string.removeIndex(prevSnapshot, change.offset, change.removeLength);
    } else {
      prevSnapshot = string.addByIndexString(prevSnapshot, change.offset, change.addValue!);
    }
  }

  return prevSnapshot;
}
