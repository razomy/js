import {DeltaString} from 'razomy/commit/datetime/delta/string/delta_string';
import {delta_strings_to_string} from 'razomy/commit/datetime/delta/string/delta_strings_to_string';
import {progress} from 'razomy/shell/log';
import {strings_to_delta_strings} from 'razomy/commit/datetime/delta/string/strings_to_delta_strings';

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

export function map_commit(commits: ActorDatetimeDeltaString[]) {
  let snapshot_ = '';
  const result: ActorDatetimeDeltaString[] = [];
  for (let i = 0; i < commits.length; i++) {
    progress(i, commits.length);
    const commit = commits[i];
    if (commit.deltas.length === 0) {
      continue;
    }
    const commit_snapshot = addss_to_string(snapshot_, [commit]);
    result.push({
      deltas: strings_to_delta_strings(snapshot_, commit_snapshot),
      actor: commit.actor,
      datetime: commit.datetime,
    });
    snapshot_ = commit_snapshot;
  }
  return result;
}

function find_repetitions(arr: ActorDatetimeDeltaString[]) {
  const frequency_map = new Map();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    for (let j = 0; j < item.deltas.length; j++) {
      const change = item.deltas[j];
      if ('add_value' in change) {
        if (frequency_map.has(change.add_value)) {
          frequency_map.set(change.add_value, frequency_map.get(change.add_value) + 1);
        } else {
          frequency_map.set(change.add_value, 1);
        }
      }

    }
  }


  const repetitive_items = Array.from(frequency_map.entries())
    .filter(([item, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]);

  const repetitions: string[] = [];


  // Collect items that appear more than once
  repetitive_items.forEach(([item, count]) => {
    repetitions.push(count + '_' + item);
  });

  return repetitions;
}
