import {DeltaString} from '@razomy/commit-datetime-delta-string';
import {deltaStringsToString} from '@razomy/commit-datetime-delta-string';

export interface ActorDatetimeDeltaString {
  datetime: string,
  actor: string,
  deltas: DeltaString[],
}

export function addssToString(prevSnapshot: string, commits: ActorDatetimeDeltaString[]): string {
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    prevSnapshot = deltaStringsToString(prevSnapshot, commit.deltas);
  }

  return prevSnapshot;
}

