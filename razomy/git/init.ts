import {try_set} from 'razomy.fs/file/try_set';
import {execute_async} from 'razomy.shell/execute_async';

export async function init(dir_path: string, file_name: string) {
  await execute_async('git init && git config gc.auto 0', {cwd: dir_path});
  let prev_snapshot = '';
  try_set(file_name, prev_snapshot);
  await execute_async(`git add .`, {cwd: dir_path});
}