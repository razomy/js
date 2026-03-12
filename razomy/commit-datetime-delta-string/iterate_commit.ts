import * as commitDatetimeDeltaString from '@razomy/commit-datetime-delta-string';

export function iterateCommit(commits: commitDatetimeDeltaString.DeltaString[], iter) {
  let snapshot = '';
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    const commitSnapshot = commitDatetimeDeltaString.deltaStringsToString(snapshot, [commit]);
    iter(snapshot);
    snapshot = commitSnapshot;
  }
}
