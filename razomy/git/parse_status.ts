import {Status} from './get_status';

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
      status.files.push({type, path: path.join(' ')});
    }
  });

  status.clean = status.files.length === 0;
  return status;
}