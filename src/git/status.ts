import {executeAsync} from "razomy.js/shells/execute";
import {exec} from "child_process";

interface Status {
  local_branch: string,
  remote_branch: string,
  remote_diff: string,
  clean: boolean,
  files: string[],
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
    files: [] as string[],
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
      status.files.push(str);
    }
  });

  status.clean = status.files.length === 0;
  return status;
}

export function parse_show_ref(str: string) {
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

export function getStatus(callback: (err, status) => void, dir_path: string) {
  var cmd = 'git status --porcelain -b';
  exec(cmd, {cwd: dir_path}, function (err, stdout) {
    if (err) return callback(err, null);
    callback(null, parse_status(stdout));
  });
}

export async function isClean(dir_path: string) {
  return new Promise<boolean>((res, ex) => {
    getStatus((e, c) => {
      if (e) {
        ex(e);
        return;
      }
      res(c.clean);
    }, dir_path);
  });
}


export async function get_last_commit_id_or_null(ctx: { dir_path: string }) {
  try {
    return (await executeAsync(`git log --format="%H" -n 1`, {cwd: ctx.dir_path})).toString();
  } catch (e) {

  }
  return null;
}
