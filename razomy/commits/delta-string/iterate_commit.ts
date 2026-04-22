import * as commits_ from "@razomy/commits";

export function iterateCommit(commits: commits_.deltaString.DeltaString[], iter) {
  let snapshot = '';
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    const commitSnapshot = commits_.deltaString.deltaStringsToString(snapshot, [commit]);
    iter(snapshot);
    snapshot = commitSnapshot;
  }
}
