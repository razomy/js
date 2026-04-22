import * as string from '@razomy/string';
import * as commits from "@razomy/commits";

export function deltaStringsToString(prevSnapshot: string, changes: commits.deltaString.DeltaString[]): string {
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
