import fs from 'fs';

export function delete_(filePath: string) {
  return fs.rmSync(filePath, {recursive: true, force: true});
}

export function delete_async(filePath: string) {
  return fs.rmSync(filePath, {recursive: true, force: true});
}
