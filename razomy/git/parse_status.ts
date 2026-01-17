import {Status} from './get_status';

export function parseStatus(str: string): Status {
  var lines;
  var branchLine;
  var branches;
  var status: Status = {
    localBranch: '',
    remoteBranch: '',
    remoteDiff: '',
    clean: true,
    files: [],
  };
  var result;
  var initialCommitRx = /^\#\# Initial commit on ([^\n]+)\s?$/;

  lines = str.trim().split('\n');
  branchLine = lines.shift();

  result = branchLine.match(initialCommitRx);

  if (result) {
    status.localBranch = result[1];
    return status;
  }

  branchLine = branchLine.replace(/\#\#\s+/, '');

  branches = branchLine.split('...');
  status.localBranch = branches[0];
  status.remoteDiff = '';
  if (branches[1]) {
    result = branches[1].match(/^([^\s]+)/);
    status.remoteBranch = result[1];
    result = branches[1].match(/\[([^\]]+)\]/);
    status.remoteDiff = result ? result[1] : null;
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