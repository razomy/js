import {DeltaString} from '@razomy/commit.datetime.delta.string';
import {deltaStringsToString} from '@razomy/commit.datetime.delta.string';

export function iterateCommit(commits: DeltaString[], iter) {
  let snapshot = '';
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    const commitSnapshot = deltaStringsToString(snapshot, [commit]);
    iter(snapshot);
    snapshot = commitSnapshot;
  }
}
