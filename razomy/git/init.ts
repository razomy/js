import {trySet} from '@razomy/fs-file';
import {execute} from '@razomy/shell';

export async function init(dirPath: string, fileName: string) {
  await execute('git init && git config gc.auto 0', dirPath);
  let prevSnapshot = '';
  trySet(fileName, prevSnapshot);
  await execute(`git add .`, dirPath);
}