import * as git from '@razomy/git';

export function getStatusFileChanges(dirPath: string) {
  const result: git.FileChanges = {
    created: [],
    modified: [],
    deleted: [],
  };
  const status = git.getStatusSync(dirPath);
  status.files.map((i) => git.statusFilesToFileChangesMut(result, i.type + '\t' + i.path.replaceAll(/ +-> +/g, '\t')));
  return result;
}
