import fs from 'fs';

export function isDirEmpty(dirPath: string) {
  const files = fs.readdirSync(dirPath);
  return files.length === 0;
}
