import {execSync} from 'node:child_process';
import path from 'path';
import {DirPathString} from 'razomy/path/string/path_string';

export type StringCommand = string;
export type ShellCommand = StringCommand;

function execute_sync(shell_command: ShellCommand, dir_path: DirPathString) {
  console.log(shell_command);
  const result = execSync(shell_command, {
    cwd: path.resolve(dir_path),
    encoding: 'utf-8',
  });
  console.log(result);
  return result;
}

export default execute_sync;
