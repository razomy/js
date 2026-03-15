import * as shell from '@razomy/shell';

export function getLastCommitId(ctx: { dirPath: string }) {
  return shell.executeSync(`git log --format="%H" -n 1`, ctx.dirPath);
}
