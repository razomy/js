import {DeltaString} from 'razomy.commit/datetime/delta/string/delta_string';
import {add_index_string, remove_index_string} from 'razomy.string/index_string';

function delta_strings_to_string(prev_snapshot: string, changes: DeltaString[]): string {
  for (let j = 0; j < changes.length; j++) {
    const change = changes[j];
    if ('remove_length' in change) {
      prev_snapshot = remove_index_string(prev_snapshot, change.offset, change.remove_length);
    } else {
      prev_snapshot = add_index_string(prev_snapshot, change.offset, change.add_value!);
    }
  }

  return prev_snapshot;
}

export default delta_strings_to_string;
