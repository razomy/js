import { execSync } from 'node:child_process';
import * as path from 'path';
import * as abstractions from '@razomy/abstractions';

export type StringCommand = string;
export type ShellCommand = StringCommand;

export const START_DIR = path.resolve(process.argv[1], '../');

export function executeSync(
  shellCommand: ShellCommand,
  dirPath: abstractions.components.DirPathString = START_DIR,
) {
  const path_ = path.resolve(dirPath);
  const result = execSync(shellCommand, {
    cwd: path_,
    encoding: 'utf-8',
  });
  return result;
}
