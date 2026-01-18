import {progress} from 'razomy.shell';
import {stringsToDeltaStrings} from 'razomy.commit.datetime.delta.string';
import {ActorDatetimeDeltaString, addssToString} from './addss_to_string';

export function mapCommit(commits: ActorDatetimeDeltaString[]) {
  let snapshot = '';
  const result: ActorDatetimeDeltaString[] = [];
  for (let i = 0; i < commits.length; i++) {
    progress(i, commits.length);
    const commit = commits[i];
    if (commit.deltas.length === 0) {
      continue;
    }
    const commitSnapshot = addssToString(snapshot, [commit]);
    result.push({
      deltas: stringsToDeltaStrings(snapshot, commitSnapshot),
      actor: commit.actor,
      datetime: commit.datetime,
    });
    snapshot = commitSnapshot;
  }

  return result;
}
