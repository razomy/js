import * as commitsDeltaString from '@razomy/commits/delta-string';

export function iterateCommit(commits: commitsDeltaString.DeltaString[], iter) {
  let snapshot = '';
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    const commitSnapshot = commitsDeltaString.deltaStringsToString(snapshot, [commit]);
    iter(snapshot);
    snapshot = commitSnapshot;
  }
}
