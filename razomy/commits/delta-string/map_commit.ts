import * as shell from '@razomy/shell';
import * as commitDatetimeDeltaString from './index';

export function mapCommit(commits: commitDatetimeDeltaString.ActorDatetimeDeltaString[]) {
  let snapshot = '';
  const result: commitDatetimeDeltaString.ActorDatetimeDeltaString[] = [];
  for (let i = 0; i < commits.length; i++) {
    shell.progress(i, commits.length);
    const commit = commits[i];
    if (commit.deltas.length === 0) {
      continue;
    }
    const commitSnapshot = commitDatetimeDeltaString.addssToString(snapshot, [commit]);
    result.push({
      deltas: commitDatetimeDeltaString.stringsToDeltaStrings(snapshot, commitSnapshot),
      actor: commit.actor,
      datetime: commit.datetime,
    });
    snapshot = commitSnapshot;
  }

  return result;
}
