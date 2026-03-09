import type { DeltaString } from '@razomy/commit-datetime-delta-string';
import { addByIndexString, removeIndex } from '@razomy/string';

export function deltaStringsToString(prevSnapshot: string, changes: DeltaString[]): string {
  for (let j = 0; j < changes.length; j++) {
    const change = changes[j];
    if ('removeLength' in change) {
      prevSnapshot = removeIndex(prevSnapshot, change.offset, change.removeLength);
    } else {
      prevSnapshot = addByIndexString(prevSnapshot, change.offset, change.addValue!);
    }
  }

  return prevSnapshot;
}
