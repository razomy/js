import {differences_string} from 'razomy.string/differences_string';
import {DeltaString} from 'razomy.commit/datetime/delta/string/delta_string';

export function strings_to_delta_strings(getPreviousContent: string, getCurrentContent: string): DeltaString[] {
  const diff_result = differences_string(getPreviousContent, getCurrentContent);

  const changes: DeltaString[] = [];
  let offset = 0;
  for (let i = 0; i < diff_result.length; i++) {
    const diff_change = diff_result[i];

    if (diff_change.type === 'added') {
      changes.push({
        offset,
        add_value: diff_change.value,
      });
      offset += diff_change.value.length;
    } else if (diff_change.type === 'removed') {
      changes.push({
        offset,
        remove_length: diff_change.value.length,
      });
    } else {
      offset += diff_change.value.length;
    }
  }

  return changes;
}


