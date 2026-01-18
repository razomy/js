import {execSync} from 'node:child_process';
import path from 'path';
import {DirPathString} from 'razomy.path.string';

export type StringCommand = string;
export type ShellCommand = StringCommand;

export function executeSync(shellCommand: ShellCommand, dirPath: DirPathString) {
  console.log(shellCommand);
  const result = execSync(shellCommand, {
    cwd: path.resolve(dirPath),
    encoding: 'utf-8',
  });
  console.log(result);
  return result;
}


