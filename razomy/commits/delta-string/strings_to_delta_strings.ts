import * as strings from '@razomy/strings';
import * as commitDatetimeDeltaString from './index';

export function stringsToDeltaStrings(
  getPreviousContent: string,
  getCurrentContent: string,
): commitDatetimeDeltaString.DeltaString[] {
  const diffResult = strings.differencesString(getPreviousContent, getCurrentContent);

  const changes: commitDatetimeDeltaString.DeltaString[] = [];
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
