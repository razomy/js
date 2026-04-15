import {execSync} from 'node:child_process';
import * as git from "@razomy/git";

export function getStatusSync(dirPath: string) {
  const cmd = 'git status --porcelain -b';
  const stdout = execSync(cmd, {cwd: dirPath, encoding: 'utf-8'});
  return git.parseStatus(stdout);
}