import * as shell from '@razomy/shell';
import * as commitsDeltaString from '@razomy/commits/delta-string';

export function mapCommit(commits: commitsDeltaString.ActorDatetimeDeltaString[]) {
  let snapshot = '';
  const result: commitsDeltaString.ActorDatetimeDeltaString[] = [];
  for (let i = 0; i < commits.length; i++) {
    shell.progress(i, commits.length);
    const commit = commits[i];
    if (commit.deltas.length === 0) {
      continue;
    }
    const commitSnapshot = commitsDeltaString.addssToString(snapshot, [commit]);
    result.push({
      deltas: commitsDeltaString.stringsToDeltaStrings(snapshot, commitSnapshot),
      actor: commit.actor,
      datetime: commit.datetime,
    });
    snapshot = commitSnapshot;
  }

  return result;
}
