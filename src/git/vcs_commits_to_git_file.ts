import * as shell from '@razomy/shell';
import * as fsFile from '@razomy/fs-file';
import * as commits_ from "@razomy/commits";

export async function vcsCommitsToGitFile(
  prevSnapshot: string,
  dirPath: string,
  fileName: string,
  commits: commits_.deltaString.ActorDatetimeDeltaString[],
) {
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    if (!commit.deltas.length) {
      continue;
    }
    prevSnapshot = commits_.deltaString.addssToString(prevSnapshot, [commit]);
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
