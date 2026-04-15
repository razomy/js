import * as fss from '@razomy/fss';

export function setFile(filePath: string, data: string) {
  fss.file.setSync(filePath, data);
}
