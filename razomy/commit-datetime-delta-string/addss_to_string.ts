import * as commitDatetimeDeltaString from '@razomy/commit-datetime-delta-string';

export interface ActorDatetimeDeltaString {
  datetime: string;
  actor: string;
  deltas: commitDatetimeDeltaString.DeltaString[];
}

export function addssToString(prevSnapshot: string, commits: ActorDatetimeDeltaString[]): string {
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    prevSnapshot = commitDatetimeDeltaString.deltaStringsToString(prevSnapshot, commit.deltas);
  }

  return prevSnapshot;
}
