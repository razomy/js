import {execSync} from 'node:child_process';
import * as path from 'path';
import {DirPathString} from '@razomy/path.string';

export type StringCommand = string;
export type ShellCommand = StringCommand;

export const startDir = path.resolve(process.argv[1], '../');

export function executeSync(shellCommand: ShellCommand, dirPath: DirPathString = startDir) {
  const path_ = path.resolve(dirPath)
  console.info(startDir, shellCommand);
  const result = execSync(shellCommand, {
    cwd: path_,
    encoding: 'utf-8',
  });
  console.info(result);
  return result;
}


