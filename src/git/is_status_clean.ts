import * as git from '@razomy/git';

export async function isStatusClean(dirPath: string) {
  return (await git.getStatus(dirPath)).clean;
}
