import {DeltaString} from '@razomy/commit.datetime.delta.string';
import {removeIndexString} from '@razomy/string';
import {addIndexString} from '@razomy/string';

export function deltaStringsToString(prevSnapshot: string, changes: DeltaString[]): string {
  for (let j = 0; j < changes.length; j++) {
    const change = changes[j];
    if ('removeLength' in change) {
      prevSnapshot = removeIndexString(prevSnapshot, change.offset, change.removeLength);
    } else {
      prevSnapshot = addIndexString(prevSnapshot, change.offset, change.addValue!);
    }
  }

  return prevSnapshot;
}


