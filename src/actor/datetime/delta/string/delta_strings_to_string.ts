import {DeltaString} from 'razomy/actor/datetime/delta/string/delta_string';
import {add_index_string, remove_index_string} from 'razomy/string/index_string';

export function delta_strings_to_string(prev_snapshot: string, changes: DeltaString[]): string {
  for (let j = 0; j < changes.length; j++) {
    const change = changes[j];
    if ('removeLength' in change) {
      prev_snapshot = remove_index_string(prev_snapshot, change.offset, change.removeLength);
    } else {
      prev_snapshot = add_index_string(prev_snapshot, change.offset, change.addValue!);
    }
  }

  return prev_snapshot;
}
