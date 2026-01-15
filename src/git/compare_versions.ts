import simpleGit from 'simple-git'
import {strings_to_delta_strings} from 'razomy.commit/datetime/delta/string/strings_to_delta_strings';
import  { addss_to_string, ActorDatetimeDeltaString } from 'razomy.commit/datetime/delta/string/adds';

import {get_all_commit_hashes} from './get_all_commit_hashes';

export async function compare_versions(repo_path, file_path) {
    const git = simpleGit(repo_path);
    const commits = await get_all_commit_hashes(git);
    const history = {
            commits: [] as ActorDatetimeDeltaString[],
          };
    for (let i = 1; i < commits.length; i++) {
    const from = commits[i - 1];
    const to = commits[i];
    const get_previous_content = await git.show([`${from.hash}:${file_path}`]);
    const get_current_content = await git.show([`${to.hash}:${file_path}`]);

    const changes = strings_to_delta_strings(get_previous_content, get_current_content);

    const commit:ActorDatetimeDeltaString = {
      datetime: to.date,
      actor: to.author_name,
      deltas: changes,
    };

    history.commits.push(commit);
    }

    const snapshot_1 = addss_to_string('', history.commits);
    const last_commit = await git.show([`${commits.at(-1)!.hash}:${file_path}`]);
    if (snapshot_1 !== last_commit) {
    throw 'error';
    }

    return history;
}
