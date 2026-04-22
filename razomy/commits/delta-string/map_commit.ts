import * as shell from '@razomy/shell';
import * as commits_ from "@razomy/commits";

export function mapCommit(commits: commits_.deltaString.ActorDatetimeDeltaString[]) {
  let snapshot = '';
  const result: commits_.deltaString.ActorDatetimeDeltaString[] = [];
  for (let i = 0; i < commits.length; i++) {
    shell.progress(i, commits.length);
    const commit = commits[i];
    if (commit.deltas.length === 0) {
      continue;
    }
    const commitSnapshot = commits_.deltaString.addssToString(snapshot, [commit]);
    result.push({
      deltas: commits_.deltaString.stringsToDeltaStrings(snapshot, commitSnapshot),
      actor: commit.actor,
      datetime: commit.datetime,
    });
    snapshot = commitSnapshot;
  }

  return result;
}
