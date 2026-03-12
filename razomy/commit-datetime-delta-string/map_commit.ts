import { type ActorDatetimeDeltaString, addssToString } from './addss_to_string';
import * as shell from '@razomy/shell';
import * as commitDatetimeDeltaString from '@razomy/commit-datetime-delta-string';

export function mapCommit(commits: ActorDatetimeDeltaString[]) {
  let snapshot = '';
  const result: ActorDatetimeDeltaString[] = [];
  for (let i = 0; i < commits.length; i++) {
    shell.progress(i, commits.length);
    const commit = commits[i];
    if (commit.deltas.length === 0) {
      continue;
    }
    const commitSnapshot = addssToString(snapshot, [commit]);
    result.push({
      deltas: commitDatetimeDeltaString.stringsToDeltaStrings(snapshot, commitSnapshot),
      actor: commit.actor,
      datetime: commit.datetime,
    });
    snapshot = commitSnapshot;
  }

  return result;
}
