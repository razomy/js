import * as fss from '@razomy/fss';

export function getDirFiles(dirPath: string) {
  return fss.directory.getSync(dirPath);
}
