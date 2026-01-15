import {try_write_file} from 'src/fs/file/try_write_file';
import {execute_async} from 'src/shell/execute_async';

export async function init(dir_path: string, file_name: string) {
  await execute_async('git init && git config gc.auto 0', {cwd: dir_path});
  let prev_snapshot = '';
  try_write_file(file_name, prev_snapshot);
  await execute_async(`git add .`, {cwd: dir_path});
}