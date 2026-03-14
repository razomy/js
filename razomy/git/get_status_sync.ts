import {execSync} from 'node:child_process';
import {parseStatus} from './parse_status';
import {type FileChanges, statusFilesToFileChangesMut} from './getChangesBetween';

export function getStatusSync(dirPath: string) {
  const cmd = 'git status --porcelain -b';
  const stdout = execSync(cmd, {cwd: dirPath, encoding: 'utf-8'});
  return parseStatus(stdout);
}

export function getStatusFileChanges(dirPath: string) {
  const result: FileChanges = {
    created: [],
    modified: [],
    deleted: [],
  };
  const status = getStatusSync(dirPath);
  status.files.map(i => statusFilesToFileChangesMut(result, i.type + '\t' + i.path.replaceAll(/ +-> +/g, '\t')));
  return result;
}