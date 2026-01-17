import simpleGit from 'simple-git'
import {stringsToDeltaStrings} from 'razomy.commit/datetime/delta/string/strings_to_delta_strings';
import {ActorDatetimeDeltaString, addssToString} from 'razomy.commit/datetime/delta/string/addss_to_string';

import {getAllCommitHashes} from './get_all_commit_hashes';

export async function compareVersions(repoPath, filePath) {
  const git = simpleGit(repoPath);
  const commits = await getAllCommitHashes(git);
  const history = {
    commits: [] as ActorDatetimeDeltaString[],
  };
  for (let i = 1; i < commits.length; i++) {
    const from = commits[i - 1];
    const to = commits[i];
    const getPreviousContent = await git.show([`${from.hash}:${filePath}`]);
    const getCurrentContent = await git.show([`${to.hash}:${filePath}`]);

    const changes = stringsToDeltaStrings(getPreviousContent, getCurrentContent);

    const commit: ActorDatetimeDeltaString = {
      datetime: to.date,
      actor: to.authorName,
      deltas: changes,
    };

    history.commits.push(commit);
  }

  const snapshot1 = addssToString('', history.commits);
  const lastCommit = await git.show([`${commits.at(-1)!.hash}:${filePath}`]);
  if (snapshot1 !== lastCommit) {
    throw 'error';
  }

  return history;
}
