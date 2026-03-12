import * as shell from '@razomy/shell';

export async function getLastGitCommitIdOrNull(ctx: { dirPath: string }) {
  try {
    return (await shell.execute(`git log --format="%H" -n 1`, ctx.dirPath)).toString();
  } catch (e) {}

  return null;
}
