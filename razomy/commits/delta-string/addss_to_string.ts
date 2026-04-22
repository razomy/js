import * as commits_ from "@razomy/commits";

export interface ActorDatetimeDeltaString {
  datetime: string;
  actor: string;
  deltas: commits_.deltaString.DeltaString[];
}

export function addssToString(prevSnapshot: string, commits: ActorDatetimeDeltaString[]): string {
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    prevSnapshot = commits_.deltaString.deltaStringsToString(prevSnapshot, commit.deltas);
  }

  return prevSnapshot;
}
