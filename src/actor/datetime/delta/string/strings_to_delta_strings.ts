import {differences_string} from 'razomy/string/differences_string';
import {DeltaString} from 'razomy/actor/datetime/delta/string/delta_string';

export function strings_to_delta_strings(getPreviousContent: string, getCurrentContent: string): DeltaString[] {
  const diffResult = differences_string(getPreviousContent, getCurrentContent);

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
