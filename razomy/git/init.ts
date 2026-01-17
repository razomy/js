import {trySet} from 'razomy.fs/file/try_set';
import {executeAsync} from 'razomy.shell/execute_async';

export async function init(dirPath: string, fileName: string) {
  await executeAsync('git init && git config gc.auto 0', {cwd: dirPath});
  let prevSnapshot = '';
  trySet(fileName, prevSnapshot);
  await executeAsync(`git add .`, {cwd: dirPath});
}