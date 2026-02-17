import fs from 'fs';

export function deleteSync(filePath: string) {
  return fs.rmSync(filePath, {recursive: true, force: true});
}
