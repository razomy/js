import {DeltaString} from 'razomy.commit/datetime/delta/string/delta_string';

export function remove_duplicated_changes(changes: DeltaString[]): DeltaString[] {
  const minimized_changes: DeltaString[] = [];

  for (let i = 0; i < changes.length; i++) {
    const current = changes[i];

    // Check if the change conflicts with any subsequent changes
    const has_conflict = changes.slice(i + 1).some(change => {
      return change.offset === current.offset && (
        ('add_value' in change && 'add_value' in current && change.add_value && current.add_value) ||
        ('remove_length' in change && 'remove_length' in current && change.remove_length && current.remove_length)
      );
    });

    // If there is no conflict, add the change to the minimized array
    if (!has_conflict) {
      minimized_changes.push(current);
    }
  }

  return minimized_changes;
}
