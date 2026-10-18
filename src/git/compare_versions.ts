import simpleGit from 'simple-git';
import * as git_ from '@razomy/git';
import * as commits_ from "@razomy/commits";

export async function compareVersions(repoPath: string, filePath: string) {
  const git = simpleGit(repoPath);
  const commits = await git_.getCommitsHash(git);
  const history = {
    commits: [] as commits_.deltaString.ActorDatetimeDeltaString[],
  };
  for (let i = 1; i < commits.length; i++) {
    const from = commits[i - 1];
    const to = commits[i];
    const getPreviousContent = await git.show([`${from.hash}:${filePath}`]);
    const getCurrentContent = await git.show([`${to.hash}:${filePath}`]);

    const changes = commits_.deltaString.stringsToDeltaStrings(getPreviousContent, getCurrentContent);

    const commit: commits_.deltaString.ActorDatetimeDeltaString = {
      datetime: to.date,
      actor: to.authorName,
      deltas: changes,
    };

    history.commits.push(commit);
  }

  const snapshot1 = commits_.deltaString.addssToString('', history.commits);
  const lastCommit = await git.show([`${commits.at(-1)!.hash}:${filePath}`]);
  if (snapshot1 !== lastCommit) {
    throw 'error';
  }

  return history;
}
