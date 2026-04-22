import * as commitsDeltaString from '@razomy/commits/delta-string';
import * as patters from "@razomy/patters";

export function stringsToDeltaStrings(
  getPreviousContent: string,
  getCurrentContent: string,
): commitsDeltaString.DeltaString[] {
  const diffResult = patters.differences.differencesString(getPreviousContent, getCurrentContent);

  const changes: commitsDeltaString.DeltaString[] = [];
  let offset = 0;
  for (let i = 0; i < diffResult.length; i++) {
    const diffChange = diffResult[i];

    if (diffChange.type === 'added') {
      changes.push({
        offset,
        addValue: diffChange.value,
      });
      offset += diffChange.value.length;
    } else if (diffChange.type === 'removed') {
      changes.push({
        offset,
        removeLength: diffChange.value.length,
      });
    } else {
      offset += diffChange.value.length;
    }
  }

  return changes;
}
