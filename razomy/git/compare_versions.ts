import simpleGit from 'simple-git';
import {getCommitsHash} from './get_commits_hash';
import * as commitDatetimeDeltaString from '@razomy/commit-datetime-delta-string';

export async function compareVersions(repoPath: string, filePath: string) {
  const git = simpleGit(repoPath);
  const commits = await getCommitsHash(git);
  const history = {
    commits: [] as commitDatetimeDeltaString.ActorDatetimeDeltaString[],
  };
  for (let i = 1; i < commits.length; i++) {
    const from = commits[i - 1];
    const to = commits[i];
    const getPreviousContent = await git.show([`${from.hash}:${filePath}`]);
    const getCurrentContent = await git.show([`${to.hash}:${filePath}`]);

    const changes = commitDatetimeDeltaString.stringsToDeltaStrings(getPreviousContent, getCurrentContent);

    const commit: commitDatetimeDeltaString.ActorDatetimeDeltaString = {
      datetime: to.date,
      actor: to.authorName,
      deltas: changes,
    };

    history.commits.push(commit);
  }

  const snapshot1 = commitDatetimeDeltaString.addssToString('', history.commits);
  const lastCommit = await git.show([`${commits.at(-1)!.hash}:${filePath}`]);
  if (snapshot1 !== lastCommit) {
    throw 'error';
  }

  return history;
}
