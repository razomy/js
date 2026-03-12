import * as shell from '@razomy/shell';
import * as commitDatetimeDeltaString from '@razomy/commit-datetime-delta-string';
import * as fsFile from '@razomy/fs-file';

export async function vcsCommitsToGitFile(
  prevSnapshot: string,
  dirPath: string,
  fileName: string,
  commits: commitDatetimeDeltaString.ActorDatetimeDeltaString[],
) {
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    if (!commit.deltas.length) {
      continue;
    }
    prevSnapshot = commitDatetimeDeltaString.addssToString(prevSnapshot, [commit]);
    fsFile.trySet(fileName, prevSnapshot);
    shell.progress(i, commits.length);
    await shell.execute(
      `git commit -a --no-verify --author "${commit.actor} <>" --date "${commit.datetime}" -m "${i}"`,
      dirPath,
    );
  }
  shell.progress(commits.length, commits.length);
  await shell.execute('git gc', dirPath);
}
