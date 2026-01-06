import {DeltaString} from 'razomy.js/add/string/delta_string';
import {delta_strings_to_string} from 'razomy.js/add/string/delta_strings_to_string';
import {progress} from 'razomy.js/shell/log';
import {strings_to_delta_strings} from 'razomy.js/add/string/strings_to_delta_strings';

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

function findRepetitions(arr: ActorDatetimeDeltaString[]) {
  const frequencyMap = new Map();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    for (let j = 0; j < item.deltas.length; j++) {
      const change = item.deltas[j];
      if ('addValue' in change) {
        if (frequencyMap.has(change.addValue)) {
          frequencyMap.set(change.addValue, frequencyMap.get(change.addValue) + 1);
        } else {
          frequencyMap.set(change.addValue, 1);
        }
      }

    }
  }


  const repetitiveItems = Array.from(frequencyMap.entries())
    .filter(([item, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]);

  const repetitions: string[] = [];


  // Collect items that appear more than once
  repetitiveItems.forEach(([item, count]) => {
    repetitions.push(count + '_' + item);
  });

  return repetitions;
}
