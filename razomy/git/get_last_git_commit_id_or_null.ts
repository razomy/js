import {executeAsync} from 'razomy.shell';

export async function getLastGitCommitIdOrNull(ctx: { dirPath: string }) {
  try {
    return (await executeAsync(`git log --format="%H" -n 1`, {cwd: ctx.dirPath})).toString();
  } catch (e) {

  }

  return null;
}
