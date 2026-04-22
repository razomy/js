import * as commitsDeltaString from '@razomy/commits/delta-string';

export interface ActorDatetimeDeltaString {
  datetime: string;
  actor: string;
  deltas: commitsDeltaString.DeltaString[];
}

export function addssToString(prevSnapshot: string, commits: ActorDatetimeDeltaString[]): string {
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    prevSnapshot = commitsDeltaString.deltaStringsToString(prevSnapshot, commit.deltas);
  }

  return prevSnapshot;
}
