import * as commitDatetimeDeltaString from './index';

export function iterateCommit(commits: commitDatetimeDeltaString.DeltaString[], iter) {
  let snapshot = '';
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    const commitSnapshot = commitDatetimeDeltaString.deltaStringsToString(snapshot, [commit]);
    iter(snapshot);
    snapshot = commitSnapshot;
  }
}
