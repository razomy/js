import {differencesString} from 'razomy.string/differences_string';
import {DeltaString} from 'razomy.commit/datetime/delta/string/delta_string';

export function stringsToDeltaStrings(getPreviousContent: string, getCurrentContent: string): DeltaString[] {
  const diffResult = differencesString(getPreviousContent, getCurrentContent);

  const changes: DeltaString[] = [];
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


