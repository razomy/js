import {DeltaString} from 'razomy.commit/datetime/delta/string/delta_string';
import {delta_strings_to_string} from 'razomy.commit/datetime/delta/string/delta_strings_to_string';

export interface ActorDatetimeDeltaString {
  datetime: string,
  actor: string,
  deltas: DeltaString[],
}

export function addss_to_string(prev_snapshot: string, commits: ActorDatetimeDeltaString[]): string {
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    prev_snapshot = delta_strings_to_string(prev_snapshot, commit.deltas);
  }

  return prev_snapshot;
}

