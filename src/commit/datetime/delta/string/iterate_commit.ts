import { DeltaString } from 'razomy.commit/datetime/delta/string/delta_string';
import {delta_strings_to_string} from 'razomy.commit/datetime/delta/string/delta_strings_to_string';

export function iterate_commit(commits: DeltaString[], iter) {
    let snapshot = '';
    for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    const commit_snapshot = delta_strings_to_string(snapshot, [commit]);
    iter(snapshot);
    snapshot = commit_snapshot;
    }
}
