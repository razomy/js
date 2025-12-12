import {exec} from 'child_process';
import {execSync} from 'node:child_process';

interface Status {
  local_branch: string,
  remote_branch: string,
  remote_diff: string,
  clean: boolean,
  files: { type: 'M' | 'D', path: string }[],
}

export function parse_status(str: string): Status {
  var lines;
  var branch_line;
  var branches;
  var status: Status = {
    local_branch: '',
    remote_branch: '',
    remote_diff: '',
    clean: true,
    files: [],
  };
  var result;
  var initial_commit_rx = /^\#\# Initial commit on ([^\n]+)\s?$/;

  lines = str.trim().split('\n');
  branch_line = lines.shift();

  result = branch_line.match(initial_commit_rx);

  if (result) {
    status.local_branch = result[1];
    return status;
  }

  branch_line = branch_line.replace(/\#\#\s+/, '');

  branches = branch_line.split('...');
  status.local_branch = branches[0];
  status.remote_diff = '';
  if (branches[1]) {
    result = branches[1].match(/^([^\s]+)/);
    status.remote_branch = result[1];
    result = branches[1].match(/\[([^\]]+)\]/);
    status.remote_diff = result ? result[1] : null;
  }

  lines.forEach(function (str) {
    if (str.match(/\S/)) {
      const [type, ...path] = str.trim().split(' ')
      status.files.push({type, path: path.join(" ")});
    }
  });

  status.clean = status.files.length === 0;
  return status;
}

export function parse_status_ref(str: string) {
  var refs = {};
  var lines = str.length === 0 ? [] : str.split('\n');
  lines.forEach(function (str) {
    str = str.trim();
    if (str.length === 0) return;
    var parts = str.split(/\s+/);
    refs[parts[1]] = parts[0];

  });
  return refs;
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

export function get_status_sync(dir_path: string) {
  var cmd = 'git status --porcelain -b';
  const stdout = execSync(cmd, {cwd: dir_path, encoding: 'utf-8'});
  return parse_status(stdout);
}

export async function is_clean_status(dir_path: string) {
  return (await get_status(dir_path)).clean;
}

