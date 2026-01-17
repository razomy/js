import {DeltaString} from 'razomy.commit/datetime/delta/string/delta_string';
import {deltaStringsToString} from 'razomy.commit/datetime/delta/string/delta_strings_to_string';

export function iterateCommit(commits: DeltaString[], iter) {
  let snapshot = '';
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    const commitSnapshot = deltaStringsToString(snapshot, [commit]);
    iter(snapshot);
    snapshot = commitSnapshot;
  }
}
