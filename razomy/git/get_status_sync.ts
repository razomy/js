import {execSync} from 'node:child_process'
import {parseStatus} from './parse_status';

export function getStatusSync(dirPath: string) {
  var cmd = 'git status --porcelain -b';
  const stdout = execSync(cmd, {cwd: dirPath, encoding: 'utf-8'});
  return parseStatus(stdout);
}
