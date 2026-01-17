import {exec} from 'child_process';
import {parseStatus} from './parse_status';

export interface Status {
  localBranch: string,
  remoteBranch: string,
  remoteDiff: string,
  clean: boolean,
  files: { type: 'M' | 'D', path: string }[],
}

export async function getStatus(dirPath: string) {
  return new Promise<Status>((resolve, reject) => {
    var cmd = 'git status --porcelain -b';
    exec(cmd, {cwd: dirPath}, function (err, stdout) {
      if (err) return reject(err);
      resolve(parseStatus(stdout));
    });
  });
}


