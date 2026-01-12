import {AddDeltaString, DeltaString, RemoveDeltaString} from 'razomy/commit/datetime/delta/string/delta_string';
import {delta_strings_to_string} from 'razomy/commit/datetime/delta/string/delta_strings_to_string';

export function remove_duplicated_changes(changes: DeltaString[]): DeltaString[] {
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


export function squash_changes(changes: DeltaString[]): DeltaString[] {
  if (changes.length === 0) {
    return [];
  }

  let last_add: AddDeltaString | undefined = undefined;
  let last_remove: RemoveDeltaString | undefined = undefined;
  let last = changes[0];
  let pos_sshit = 1;
  const next: DeltaString[] = [changes[0]];

  for (let i = 1; i < changes.length; i++) {
    const current = changes[i];

    if ('addValue' in current) {
      if (last_add === undefined) {
        last_add = last = current;
        pos_sshit = 1;
        next.push(last)
        continue;
      }

      if (last_add.offset + last_add.addValue.length + pos_sshit === current.offset) {
        last_add.addValue += current.addValue;
        pos_sshit += 1;
        continue;
      }
      last_add = last = current;
      next.push(last)
      pos_sshit = 1;
    } else if ('removeLength' in current) {
      if (last_remove === undefined) {
        last_remove = last = current;
        next.push(last)
        pos_sshit = 1;
        continue;
      }

      if (last_add === undefined) {
        continue;
      }

      if (last_remove.offset + last_add.addValue.length + pos_sshit === current.offset) {
        last_remove.removeLength += current.removeLength;
        continue;
      }
      last_remove = last = current;
      pos_sshit = 1;
      next.push(last)
    }
  }

  return next;
}

export function iterate_commit(commits: DeltaString[], iter) {
  let snapshot_ = '';
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    const commit_snapshot = delta_strings_to_string(snapshot_, [commit]);
    iter(snapshot_);
    snapshot_ = commit_snapshot;
  }
}

