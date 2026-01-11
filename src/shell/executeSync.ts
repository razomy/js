import {execSync} from 'node:child_process';
import path from 'path';
import {DirPathString} from 'razomy.js/fs/pathString';

export type StringCommand = string;
export type ShellCommand = StringCommand;

export function executeSync(shell_command: ShellCommand, dir_path: DirPathString) {
  console.log(shell_command);
  const result = execSync(shell_command, {
    cwd: path.resolve(dir_path),
    encoding: 'utf-8',
  });
  console.log(result);
  return result;
}
