import * as fss from '@razomy/fss';

export function getDirFiles(dirPath: string) {
  return fss.directory.getSync(dirPath);
}

export function getFile(filePath: string) {
  return fss.file.getSync(filePath);
}

export function setFile(filePath: string, data: string) {
  fss.file.setSync(filePath, data);
}

export function choose(data: string[], index: string) {
  const result = data[Number.parseInt(index)];
  if (!result) {
    throw new Error('Index not found');
  }
  return result;
}