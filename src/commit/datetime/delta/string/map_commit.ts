import {progress} from 'razomy.shell/progress';
import {strings_to_delta_strings} from 'razomy.commit/datetime/delta/string/strings_to_delta_strings';
import  { addss_to_string,ActorDatetimeDeltaString} from './adds';

export function map_commit(commits: ActorDatetimeDeltaString[]) {
    let snapshot_ = '';
    const result: ActorDatetimeDeltaString[] = [];
    for (let i = 0; i < commits.length; i++) {
      progress(i, commits.length);
    const commit = commits[i];
    if (commit.deltas.length === 0) {
      continue;
    }
    const commit_snapshot = addss_to_string(snapshot_, [commit]);
    result.push({
      deltas: strings_to_delta_strings(snapshot_, commit_snapshot),
      actor: commit.actor,
      datetime: commit.datetime,
    });
    snapshot_ = commit_snapshot;
    }

    return result;
}
