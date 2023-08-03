import * as diff from 'diff';

// Insert characters at a specific index
export const insertAtIndex = (string, index, chars) => {
  return string.substring(0, index) + chars + string.substring(index);
};

// Remove characters from a specific index with a given length
export const removeAtIndex = (string, index, length) => {
  return string.substring(0, index) + string.substring(index + length);
};

export interface RemoveCommitChange {
  removeLength?: number,
}

export interface AddCommitChange {
  addValue?: string,
}

export interface CommitChange extends RemoveCommitChange, AddCommitChange {
  pos: number,
}

export interface Commit {
  id: string,
  date: string,
  user: string,
  changes: CommitChange[],
}

export function getCommitChanges(getPreviousContent: string, getCurrentContent: string) {
  const diffResult = diff.diffLines(
    getPreviousContent,
    getCurrentContent,
    {
      ignoreWhitespace: false,
      newlineIsToken: true,
    });

  const changes: CommitChange[] = [];
  let pos = 0;
  for (let i = 0; i < diffResult.length; i++) {
    const diffChange = diffResult[i];

    if (diffChange.added) {
      changes.push({
        pos,
        addValue: diffChange.value,
      });
      pos += diffChange.value.length;
    } else if (diffChange.removed) {
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

export function snapshot(prevSnapshot: string, commits: Commit[]) {

  let state = prevSnapshot;

  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    for (let j = 0; j < commit.changes.length; j++) {
      const change = commit.changes[j];
      if (change.removeLength) {
        state = removeAtIndex(state, change.pos, change.removeLength);
      } else {
        state = insertAtIndex(state, change.pos, change.addValue);
      }
    }
  }

  return state;
}

export function applyChanges(prevSnapshot: string, changes: CommitChange[]) {

  let state = prevSnapshot;

  for (let j = 0; j < changes.length; j++) {
    const change = changes[j];
    if (change.removeLength) {
      state = removeAtIndex(state, change.pos, change.removeLength);
    } else {
      state = insertAtIndex(state, change.pos, change.addValue);
    }
  }

  return state;
}


export function minimizeChanges(changes: CommitChange[]): CommitChange[] {
  const minimizedChanges: CommitChange[] = [];

  for (let i = 0; i < changes.length; i++) {
    const currentChange = changes[i];
    const { pos, addValue, removeLength } = currentChange;

    // Check if the change conflicts with any subsequent changes
    const hasConflict = changes.slice(i + 1).some(change => {
      return change.pos === pos && (
        (change.addValue && addValue) ||
        (change.removeLength && removeLength)
      );
    });

    // If there is no conflict, add the change to the minimized array
    if (!hasConflict) {
      minimizedChanges.push(currentChange);
    }
  }

  return minimizedChanges;
}
