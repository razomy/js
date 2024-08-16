import {differences_string} from "razomy.js/string/differences_string";
import {progress} from "razomy.js/shells/log";
import {add_index_string, remove_index_string} from "razomy.js/string/index_string";


export interface RemoveCommitChange {
  removeLength: number,
  pos: number,
}

export interface AddCommitChange {
  addValue: string,
  pos: number,
}

export type CommitChange = RemoveCommitChange | AddCommitChange;

export interface Commit {
  id: string,
  date: string,
  user: string,
  changes: CommitChange[],
}

export function getCommitChanges(getPreviousContent: string, getCurrentContent: string): CommitChange[] {
  const diffResult = differences_string(getPreviousContent, getCurrentContent);

  const changes: CommitChange[] = [];
  let pos = 0;
  for (let i = 0; i < diffResult.length; i++) {
    const diffChange = diffResult[i];

    if (diffChange.type === 'added') {
      changes.push({
        pos,
        addValue: diffChange.value,
      });
      pos += diffChange.value.length;
    } else if (diffChange.type === 'removed') {
      changes.push({
        pos,
        removeLength: diffChange.value.length,
      });
    } else {
      pos += diffChange.value.length;
    }
  }

  return changes;
}

export function snapshot(prev_snapshot: string, commits: Commit[]): string {
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    prev_snapshot = applyChanges(prev_snapshot, commit.changes);
  }

  return prev_snapshot;
}

export function applyChanges(prev_snapshot: string, changes: CommitChange[]): string {
  for (let j = 0; j < changes.length; j++) {
    const change = changes[j];
    if ('removeLength' in change) {
      prev_snapshot = remove_index_string(prev_snapshot, change.pos, change.removeLength);
    } else {
      prev_snapshot = add_index_string(prev_snapshot, change.pos, change.addValue!);
    }
  }

  return prev_snapshot;
}


export function removeDuplicatedChanges(changes: CommitChange[]): CommitChange[] {
  const minimizedChanges: CommitChange[] = [];

  for (let i = 0; i < changes.length; i++) {
    const current = changes[i];

    // Check if the change conflicts with any subsequent changes
    const hasConflict = changes.slice(i + 1).some(change => {
      return change.pos === current.pos && (
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


export function squashChanges(changes: CommitChange[]): CommitChange[] {
  if (changes.length === 0) {
    return [];
  }

  let last_add: AddCommitChange | undefined = undefined;
  let last_remove: RemoveCommitChange | undefined = undefined;
  let last = changes[0];
  let pos_sshit = 1;
  const next: CommitChange[] = [changes[0]];

  for (let i = 1; i < changes.length; i++) {
    const current = changes[i];

    if ('addValue' in current) {
      if (last_add === undefined) {
        last_add = last = current;
        pos_sshit = 1;
        next.push(last)
        continue;
      }

      if (last_add.pos + last_add.addValue.length + pos_sshit === current.pos) {
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

      if (last_remove.pos + last_add.addValue.length + pos_sshit === current.pos) {
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

export function iterate_commit(commits: Commit[], iter) {
  let snapshot_ = '';
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    const commit_snapshot = snapshot(snapshot_, [commit]);
    iter(snapshot_);
    snapshot_ = commit_snapshot;
  }
}


export function map_commit(commits: Commit[]) {
  let snapshot_ = '';
  const result: Commit[] = [];
  for (let i = 0; i < commits.length; i++) {
    progress(i, commits.length);
    const commit = commits[i];
    if (commit.changes.length === 0) {
      continue;
    }
    const commit_snapshot = snapshot(snapshot_, [commit]);
    result.push({
      changes: getCommitChanges(snapshot_, commit_snapshot),
      user: commit.user,
      id: commit.id,
      date: commit.date,
    });
    snapshot_ = commit_snapshot;
  }
  return result;
}

