import {exec} from 'child_process';
import {parse_status} from './parse_status';

export interface Status {
  local_branch: string,
  remote_branch: string,
  remote_diff: string,
  clean: boolean,
  files: { type: 'M' | 'D', path: string }[],
}

export async function get_status(dir_path: string) {
  return new Promise<Status>((resolve, reject) => {
    var cmd = 'git status --porcelain -b';
    exec(cmd, {cwd: dir_path}, function (err, stdout) {
      if (err) return reject(err);
      resolve(parse_status(stdout));
    });
  });
}


