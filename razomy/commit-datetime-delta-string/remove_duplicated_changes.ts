import type {DeltaString} from '@razomy/commit-datetime-delta-string';

export function removeDuplicatedChanges(changes: DeltaString[]): DeltaString[] {
  const minimizedChanges: DeltaString[] = [];

  for (let i = 0; i < changes.length; i++) {
    const current = changes[i];

    // Check if the change conflicts with any subsequent changes
    const hasConflict = changes.slice(i + 1).some(change => {
      return change.offset === current.offset && (
        ('addValue' in change && 'addValue' in current && change.addValue && current.addValue) ||
        ('removeLength' in change && 'removeLength' in current && change.removeLength && current.removeLength)
      );
    });

    // If there is no conflict, add the change to the minimized array
    if (!hasConflict) {
      minimizedChanges.push(current);
    }
  }

  return minimizedChanges;
}
