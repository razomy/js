import {execute} from '@razomy/shell';

export async function getLastGitCommitIdOrNull(ctx: { dirPath: string }) {
  try {
    return (await execute(`git log --format="%H" -n 1`, ctx.dirPath)).toString();
  } catch (e) {

  }

  return null;
}
