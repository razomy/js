import * as fsFile from '@razomy/fs-file';
import * as shell from '@razomy/shell';

export async function init(dirPath: string, fileName: string) {
  await shell.execute('git init && git config gc.auto 0', dirPath);
  let prevSnapshot = '';
  fsFile.trySet(fileName, prevSnapshot);
  await shell.execute(`git add .`, dirPath);
}
